"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Phone, Mail, Globe, Calendar } from "lucide-react"
import { getSalleById, type Salle } from "@/lib/data/salles"
import { spectaclesData } from "@/lib/data/spectacles"

export default function SalleDetailPage() {
    const params = useParams()
    const [salle, setSalle] = useState<Salle | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string>("")

    useEffect(() => {
        const loadSalle = async () => {
            if (params.id) {
                const data = await getSalleById(params.id as string)
                if (data) {
                    setSalle(data)
                    setSelectedImage(data.photo)
                }
                setLoading(false)
            }
        }
        loadSalle()
    }, [params.id])

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

    if (!salle) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Salle non trouvée</h1>
                        <p className="text-muted-foreground">Cette salle n'existe pas ou plus.</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    // Récupérer les spectacles programmés dans cette salle
    const spectaclesProgrammes = spectaclesData.filter(s =>
        salle.spectaclesIds.includes(s.id)
    )

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne gauche - Images et description */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative h-96 rounded-lg overflow-hidden">
                            <img
                                src={selectedImage}
                                alt={salle.nom}
                                className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                                {salle.ville}
                            </Badge>
                        </div>

                        {/* Galerie */}
                        {salle.galerie.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {salle.galerie.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`relative h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                                            selectedImage === img ? 'border-primary' : 'border-transparent hover:border-muted'
                                        }`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${salle.nom} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">À propos de la salle</h2>
                                <p className="text-muted-foreground leading-relaxed">{salle.description}</p>
                            </CardContent>
                        </Card>

                        {/* Équipements */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Équipements</h2>
                                <div className="flex flex-wrap gap-2">
                                    {salle.equipements.map((equip, index) => (
                                        <Badge key={index} variant="secondary">
                                            {equip}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Spectacles programmés */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Spectacles programmés
                                </h2>
                                {spectaclesProgrammes.length === 0 ? (
                                    <p className="text-muted-foreground">Aucun spectacle programmé pour le moment</p>
                                ) : (
                                    <div className="space-y-3">
                                        {spectaclesProgrammes.map((spectacle) => {
                                            const formattedDate = new Date(spectacle.date).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })
                                            return (
                                                <Link
                                                    key={spectacle.id}
                                                    href={`/spectacles/${spectacle.id}`}
                                                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold mb-1">{spectacle.titre}</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {formattedDate} à {spectacle.heure}
                                                            </p>
                                                            <Badge className="mt-2" variant="outline">
                                                                {spectacle.categorie}
                                                            </Badge>
                                                        </div>
                                                        <span className="text-lg font-bold">{spectacle.prix}€</span>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Colonne droite - Informations */}
                    <div className="space-y-4">
                        <Card className="sticky top-20">
                            <CardContent className="p-6">
                                <h1 className="text-3xl font-bold mb-6">{salle.nom}</h1>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Adresse</p>
                                            <p className="text-sm text-muted-foreground">
                                                {salle.adresse}
                                                <br />
                                                {salle.codePostal} {salle.ville}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Capacité</p>
                                            <p className="text-sm text-muted-foreground">{salle.capacite} places</p>
                                        </div>
                                    </div>

                                    {salle.telephone && (
                                        <div className="flex items-start gap-3">
                                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-medium">Téléphone</p>
                                                <a
                                                    href={`tel:${salle.telephone}`}
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    {salle.telephone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {salle.email && (
                                        <div className="flex items-start gap-3">
                                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <a
                                                    href={`mailto:${salle.email}`}
                                                    className="text-sm text-primary hover:underline break-all"
                                                >
                                                    {salle.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {salle.siteWeb && (
                                        <div className="flex items-start gap-3">
                                            <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-medium">Site web</p>
                                                <a
                                                    href={salle.siteWeb}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-primary hover:underline break-all"
                                                >
                                                    Visiter le site
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t pt-6">
                                    <Button size="lg" className="w-full" asChild>
                                        <Link href="/spectacles">
                                            Voir les spectacles
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}