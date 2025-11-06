"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { categories } from "@/lib/data/spectacles"

export default function AjouterSpectaclePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        date: "",
        heure: "",
        prix: "",
        categorie: "",
        lieu: "",
        duree: "",
        artistes: "",
        image: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulation d'ajout (à remplacer par vraie API)
        setTimeout(() => {
            console.log("Nouveau spectacle:", {
                ...formData,
                artistes: formData.artistes.split(',').map(a => a.trim()),
                prix: parseFloat(formData.prix)
            })
            setLoading(false)
            router.push("/admin/spectacles")
        }, 1000)
    }

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/admin/spectacles">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Link>
                </Button>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Ajouter un spectacle</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="titre">Titre *</Label>
                                <Input
                                    id="titre"
                                    value={formData.titre}
                                    onChange={(e) => handleChange('titre', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="categorie">Catégorie *</Label>
                                    <Select value={formData.categorie} onValueChange={(value) => handleChange('categorie', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.filter(c => c !== "Toutes").map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lieu">Lieu *</Label>
                                    <Input
                                        id="lieu"
                                        value={formData.lieu}
                                        onChange={(e) => handleChange('lieu', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="heure">Heure *</Label>
                                    <Input
                                        id="heure"
                                        type="time"
                                        value={formData.heure}
                                        onChange={(e) => handleChange('heure', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duree">Durée *</Label>
                                    <Input
                                        id="duree"
                                        placeholder="Ex: 2h30"
                                        value={formData.duree}
                                        onChange={(e) => handleChange('duree', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prix">Prix (€) *</Label>
                                <Input
                                    id="prix"
                                    type="number"
                                    step="0.01"
                                    value={formData.prix}
                                    onChange={(e) => handleChange('prix', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="artistes">Artistes (séparés par des virgules) *</Label>
                                <Input
                                    id="artistes"
                                    placeholder="Jean Dupont, Marie Martin, Pierre Durand"
                                    value={formData.artistes}
                                    onChange={(e) => handleChange('artistes', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">URL de l'image *</Label>
                                <Input
                                    id="image"
                                    type="url"
                                    placeholder="https://exemple.com/image.jpg"
                                    value={formData.image}
                                    onChange={(e) => handleChange('image', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={loading} className="flex-1">
                                    <Save className="mr-2 h-4 w-4" />
                                    {loading ? "Enregistrement..." : "Enregistrer"}
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