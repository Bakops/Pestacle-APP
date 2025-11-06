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
import { ArrowLeft, Save } from "lucide-react"

export default function AjouterSallePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        nom: "",
        adresse: "",
        ville: "",
        codePostal: "",
        capacite: "",
        description: "",
        photo: "",
        equipements: "",
        siteWeb: "",
        telephone: "",
        email: "",
        latitude: "",
        longitude: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            console.log("Nouvelle salle:", {
                ...formData,
                capacite: parseInt(formData.capacite),
                equipements: formData.equipements.split(',').map(e => e.trim()),
                coordonnees: {
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude)
                }
            })
            setLoading(false)
            router.push("/admin/salles")
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
                    <Link href="/admin/salles">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Link>
                </Button>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Ajouter une salle</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="nom">Nom de la salle *</Label>
                                <Input
                                    id="nom"
                                    value={formData.nom}
                                    onChange={(e) => handleChange('nom', e.target.value)}
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
                                    <Label htmlFor="adresse">Adresse *</Label>
                                    <Input
                                        id="adresse"
                                        value={formData.adresse}
                                        onChange={(e) => handleChange('adresse', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ville">Ville *</Label>
                                    <Input
                                        id="ville"
                                        value={formData.ville}
                                        onChange={(e) => handleChange('ville', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="codePostal">Code postal *</Label>
                                    <Input
                                        id="codePostal"
                                        value={formData.codePostal}
                                        onChange={(e) => handleChange('codePostal', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacite">Capacité (places) *</Label>
                                    <Input
                                        id="capacite"
                                        type="number"
                                        value={formData.capacite}
                                        onChange={(e) => handleChange('capacite', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="equipements">Équipements (séparés par des virgules) *</Label>
                                <Input
                                    id="equipements"
                                    placeholder="Parking, Accessibilité PMR, Bar, Vestiaire"
                                    value={formData.equipements}
                                    onChange={(e) => handleChange('equipements', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude *</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="0.000001"
                                        placeholder="48.8566"
                                        value={formData.latitude}
                                        onChange={(e) => handleChange('latitude', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude *</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="0.000001"
                                        placeholder="2.3522"
                                        value={formData.longitude}
                                        onChange={(e) => handleChange('longitude', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telephone">Téléphone</Label>
                                <Input
                                    id="telephone"
                                    type="tel"
                                    placeholder="+33 1 23 45 67 89"
                                    value={formData.telephone}
                                    onChange={(e) => handleChange('telephone', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="contact@salle.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="siteWeb">Site web</Label>
                                <Input
                                    id="siteWeb"
                                    type="url"
                                    placeholder="https://www.salle.com"
                                    value={formData.siteWeb}
                                    onChange={(e) => handleChange('siteWeb', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photo">URL de la photo *</Label>
                                <Input
                                    id="photo"
                                    type="url"
                                    placeholder="https://exemple.com/photo.jpg"
                                    value={formData.photo}
                                    onChange={(e) => handleChange('photo', e.target.value)}
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