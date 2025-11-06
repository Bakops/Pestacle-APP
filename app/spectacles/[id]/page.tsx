"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Timer, Star, User } from "lucide-react"
import { getSpectacleById, type Spectacle } from "@/lib/data/spectacles"

export default function SpectacleDetailPage() {
    const params = useParams()
    const [spectacle, setSpectacle] = useState<Spectacle | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string>("")

    useEffect(() => {
        const loadSpectacle = async () => {
            if (params.id) {
                const data = await getSpectacleById(params.id as string)
                if (data) {
                    setSpectacle(data)
                    setSelectedImage(data.image)
                }
                setLoading(false)
            }
        }
        loadSpectacle()
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

    if (!spectacle) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Spectacle non trouvé</h1>
                        <p className="text-muted-foreground">Ce spectacle n'existe pas ou plus.</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const formattedDate = new Date(spectacle.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const averageNote = spectacle.avis.length > 0
        ? (spectacle.avis.reduce((acc, avis) => acc + avis.note, 0) / spectacle.avis.length).toFixed(1)
        : null

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne gauche - Image et galerie */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative h-96 rounded-lg overflow-hidden">
                            <img
                                src={selectedImage}
                                alt={spectacle.titre}
                                className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                                {spectacle.categorie}
                            </Badge>
                        </div>

                        {/* Galerie */}
                        {spectacle.galerie.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {spectacle.galerie.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`relative h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                                            selectedImage === img ? 'border-primary' : 'border-transparent hover:border-muted'
                                        }`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${spectacle.titre} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">À propos du spectacle</h2>
                                <p className="text-muted-foreground leading-relaxed">{spectacle.description}</p>
                            </CardContent>
                        </Card>

                        {/* Artistes */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Artistes
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {spectacle.artistes.map((artiste, index) => (
                                        <Badge key={index} variant="secondary">
                                            {artiste}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Avis */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Avis</h2>
                                    {averageNote && (
                                        <div className="flex items-center gap-2">
                                            <Star className="h-5 w-5 fill-accent text-accent" />
                                            <span className="font-semibold">{averageNote}/5</span>
                                            <span className="text-sm text-muted-foreground">
                        ({spectacle.avis.length} avis)
                      </span>
                                        </div>
                                    )}
                                </div>
                                {spectacle.avis.length === 0 ? (
                                    <p className="text-muted-foreground">Aucun avis pour le moment</p>
                                ) : (
                                    <div className="space-y-4">
                                        {spectacle.avis.map((avis) => (
                                            <div key={avis.id} className="border-b pb-4 last:border-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold">{avis.auteur}</span>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i < avis.note
                                                                        ? 'fill-accent text-accent'
                                                                        : 'text-muted'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">{avis.commentaire}</p>
                                                <span className="text-xs text-muted-foreground">
                          {new Date(avis.date).toLocaleDateString('fr-FR')}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Colonne droite - Informations et réservation */}
                    <div className="space-y-4">
                        <Card className="sticky top-20">
                            <CardContent className="p-6">
                                <h1 className="text-3xl font-bold mb-6">{spectacle.titre}</h1>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Date</p>
                                            <p className="text-sm text-muted-foreground capitalize">{formattedDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Heure</p>
                                            <p className="text-sm text-muted-foreground">{spectacle.heure}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Lieu</p>
                                            <p className="text-sm text-muted-foreground">{spectacle.lieu}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Timer className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Durée</p>
                                            <p className="text-sm text-muted-foreground">{spectacle.duree}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6 mb-6">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <span className="text-3xl font-bold text-primary">{spectacle.prix}€</span>
                                        <span className="text-sm text-muted-foreground">à partir de</span>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full">
                                    Réserver
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}