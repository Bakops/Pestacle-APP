"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSpectacles, type Spectacle } from "@/lib/data/spectacles"
import { calculatePrixReduit } from "@/lib/data/promos"

export default function AjouterPromotionPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [spectacles, setSpectacles] = useState<Spectacle[]>([])
    const [selectedSpectacle, setSelectedSpectacle] = useState<Spectacle | null>(null)
    const [formData, setFormData] = useState({
        spectacleId: "",
        prixOriginal: "",
        pourcentageReduction: "",
        dateDebutPromo: "",
        dateFinPromo: "",
        stock: "",
        codePromo: ""
    })

    useEffect(() => {
        const loadSpectacles = async () => {
            const data = await getSpectacles()
            setSpectacles(data)
        }
        loadSpectacles()
    }, [])

    const handleSpectacleChange = (spectacleId: string) => {
        const spectacle = spectacles.find(s => s.id === spectacleId)
        if (spectacle) {
            setSelectedSpectacle(spectacle)
            setFormData({
                ...formData,
                spectacleId,
                prixOriginal: spectacle.prix.toString()
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            const prixReduit = calculatePrixReduit(
                parseFloat(formData.prixOriginal),
                parseFloat(formData.pourcentageReduction)
            )

            console.log("Nouvelle promotion:", {
                ...formData,
                prixOriginal: parseFloat(formData.prixOriginal),
                pourcentageReduction: parseFloat(formData.pourcentageReduction),
                prixReduit,
                stock: formData.stock ? parseInt(formData.stock) : undefined
            })
            setLoading(false)
            router.push("/admin/promotions")
        }, 1000)
    }

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    const prixReduit = formData.prixOriginal && formData.pourcentageReduction
        ? calculatePrixReduit(parseFloat(formData.prixOriginal), parseFloat(formData.pourcentageReduction))
        : null

    const economie = formData.prixOriginal && prixReduit
        ? parseFloat(formData.prixOriginal) - prixReduit
        : null

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/admin/promotions">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Link>
                </Button>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Créer une promotion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="spectacleId">Spectacle *</Label>
                                <Select
                                    value={formData.spectacleId}
                                    onValueChange={handleSpectacleChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un spectacle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {spectacles.map((spectacle) => (
                                            <SelectItem key={spectacle.id} value={spectacle.id}>
                                                {spectacle.titre} - {spectacle.prix}€
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedSpectacle && (
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertDescription>
                                        Spectacle sélectionné : <strong>{selectedSpectacle.titre}</strong>
                                        <br />
                                        Prix actuel : <strong>{selectedSpectacle.prix}€</strong>
                                        <br />
                                        Date : {new Date(selectedSpectacle.date).toLocaleDateString('fr-FR')} à {selectedSpectacle.heure}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prixOriginal">Prix original (€) *</Label>
                                    <Input
                                        id="prixOriginal"
                                        type="number"
                                        step="0.01"
                                        value={formData.prixOriginal}
                                        onChange={(e) => handleChange('prixOriginal', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pourcentageReduction">Réduction (%) *</Label>
                                    <Input
                                        id="pourcentageReduction"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={formData.pourcentageReduction}
                                        onChange={(e) => handleChange('pourcentageReduction', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {prixReduit !== null && economie !== null && (
                                <Alert className="bg-green-50 dark:bg-green-950 border-green-200">
                                    <AlertDescription className="font-semibold">
                                        Prix après réduction : <span className="text-destructive text-lg">{prixReduit}€</span>
                                        <br />
                                        Économie : <span className="text-green-600">{economie.toFixed(2)}€</span>
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dateDebutPromo">Date de début *</Label>
                                    <Input
                                        id="dateDebutPromo"
                                        type="date"
                                        value={formData.dateDebutPromo}
                                        onChange={(e) => handleChange('dateDebutPromo', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dateFinPromo">Date de fin *</Label>
                                    <Input
                                        id="dateFinPromo"
                                        type="date"
                                        value={formData.dateFinPromo}
                                        onChange={(e) => handleChange('dateFinPromo', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock limité (places en promo)</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="1"
                                    placeholder="Ex: 50"
                                    value={formData.stock}
                                    onChange={(e) => handleChange('stock', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Laissez vide si illimité
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="codePromo">Code promo</Label>
                                <Input
                                    id="codePromo"
                                    placeholder="Ex: PROMO30"
                                    value={formData.codePromo}
                                    onChange={(e) => handleChange('codePromo', e.target.value.toUpperCase())}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Code optionnel pour appliquer la réduction
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={loading} className="flex-1">
                                    <Save className="mr-2 h-4 w-4" />
                                    {loading ? "Création..." : "Créer la promotion"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.back()}>
                                    Annuler
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    )
}