"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { spectaclesPromo, calculatePrixReduit, type SpectaclePromo } from "@/lib/data/promos"

export default function ModifierPromotionPage() {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [promo, setPromo] = useState<SpectaclePromo | null>(null)
    const [formData, setFormData] = useState({
        prixOriginal: "",
        pourcentageReduction: "",
        dateDebutPromo: "",
        dateFinPromo: "",
        stock: "",
        codePromo: ""
    })

    useEffect(() => {
        // Simulation de chargement (à remplacer par vraie API)
        setTimeout(() => {
            const foundPromo = spectaclesPromo.find(p => p.id === params.id)
            if (foundPromo) {
                setPromo(foundPromo)
                setFormData({
                    prixOriginal: foundPromo.prixOriginal.toString(),
                    pourcentageReduction: foundPromo.pourcentageReduction.toString(),
                    dateDebutPromo: foundPromo.dateDebutPromo,
                    dateFinPromo: foundPromo.dateFinPromo,
                    stock: foundPromo.stock ? foundPromo.stock.toString() : "",
                    codePromo: foundPromo.codePromo || ""
                })
            }
            setLoading(false)
        }, 500)
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        setTimeout(() => {
            const prixReduit = calculatePrixReduit(
                parseFloat(formData.prixOriginal),
                parseFloat(formData.pourcentageReduction)
            )

            console.log("Modification de la promotion:", {
                id: params.id,
                ...formData,
                prixOriginal: parseFloat(formData.prixOriginal),
                pourcentageReduction: parseFloat(formData.pourcentageReduction),
                prixReduit,
                stock: formData.stock ? parseInt(formData.stock) : undefined
            })
            setSaving(false)
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

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Chargement...</p>
                </main>
                <Footer />
            </div>
        )
    }

    if (!promo) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Promotion non trouvée</h1>
                        <Button asChild>
                            <Link href="/admin/promotions">Retour à la liste</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

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
                        <CardTitle className="text-2xl">Modifier la promotion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                    Spectacle : <strong>{promo.titre}</strong>
                                </AlertDescription>
                            </Alert>

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
                                    value={formData.stock}
                                    onChange={(e) => handleChange('stock', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="codePromo">Code promo</Label>
                                <Input
                                    id="codePromo"
                                    value={formData.codePromo}
                                    onChange={(e) => handleChange('codePromo', e.target.value.toUpperCase())}
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={saving} className="flex-1">
                                    <Save className="mr-2 h-4 w-4" />
                                    {saving ? "Enregistrement..." : "Enregistrer les modifications"}
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