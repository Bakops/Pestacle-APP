"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Timer, Star, Quote, ExternalLink, Sparkles } from "lucide-react"
import { getPestacleSpotlight, type PestacleSpotlight } from "@/lib/data/pestacle-du-moment"

export default function PestacleSpotlightPage() {
    const [pestacle, setPestacle] = useState<PestacleSpotlight | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string>("")

    useEffect(() => {
        const loadPestacle = async () => {
            const data = await getPestacleSpotlight()
            setPestacle(data)
            setSelectedImage(data.image)
            setLoading(false)
        }
        loadPestacle()
    }, [])

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

    if (!pestacle) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Aucun pestacle du moment</h1>
                        <p className="text-muted-foreground">Revenez bientôt pour découvrir notre sélection !</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const formattedDate = new Date(pestacle.date).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const averageNote =
        pestacle.critiques.length > 0
            ? (pestacle.critiques.reduce((acc, critique) => acc + critique.note, 0) / pestacle.critiques.length).toFixed(1)
            : null

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section avec badge "Pestacle du moment" */}
            <section className="relative bg-gradient-to-b from-accent/20 to-background py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                        <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                            Pestacle du moment
                        </Badge>
                        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                        {pestacle.titre}
                    </h1>
                    <p className="text-center text-muted-foreground max-w-3xl mx-auto text-lg">
                        {pestacle.raison}
                    </p>
                </div>
            </section>

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne gauche - Contenu principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image principale */}
                        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
                            <img
                                src={selectedImage}
                                alt={pestacle.titre}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                                {pestacle.categorie}
                            </Badge>
                        </div>

                        {/* Galerie */}
                        {pestacle.galerie.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {pestacle.galerie.map((img) => (
                                    <div
                                        key={img}
                                        className={`relative h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                                            selectedImage === img ? "border-accent" : "border-transparent hover:border-muted"
                                        }`}
                                        onClick={() => setSelectedImage(img)}
                                        role="button"
                                        aria-label="Choisir l’image"
                                    >
                                        <img
                                            src={img}
                                            alt={pestacle.titre}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Vidéo si disponible */}
                        {pestacle.videoUrl && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Bande-annonce</h2>
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={pestacle.videoUrl}
                                            title={`Vidéo ${pestacle.titre}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                            loading="lazy"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
                                <p className="text-muted-foreground leading-relaxed">{pestacle.description}</p>
                            </CardContent>
                        </Card>

                        {/* Artistes */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Distribution</h2>
                                <div className="flex flex-wrap gap-2">
                                    {pestacle.artistes.map((artiste, index) => (
                                        <Badge key={`${artiste}-${index}`} variant="secondary" className="text-sm px-3 py-1">
                                            {artiste}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Critiques */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">Ce qu&apos;en dit la presse</h2>
                                    {averageNote && (
                                        <div className="flex items-center gap-2">
                                            <Star className="h-5 w-5 fill-accent text-accent" />
                                            <span className="font-semibold text-lg">{averageNote}/5</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-6">
                                    {pestacle.critiques.map((critique) => (
                                        <div key={critique.id} className="relative border-l-4 border-accent pl-6 py-2">
                                            <Quote className="absolute left-2 top-2 h-4 w-4 text-accent" />
                                            <div className="mb-3">
                                                <div className="flex items-center gap-1 mb-2">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < critique.note
                                                                    ? "fill-accent text-accent"
                                                                    : "text-muted-foreground"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-muted-foreground italic leading-relaxed mb-2">
                                                    &quot;{critique.extrait}&quot;
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-sm">{critique.auteur}</p>
                                                        <p className="text-xs text-muted-foreground">{critique.source}</p>
                                                    </div>
                                                    {critique.lien && (
                                                        <a
                                                            href={critique.lien}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-primary hover:underline flex items-center gap-1"
                                                        >
                                                            Lire la critique
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Avis du public */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Avis du public</h2>
                                {pestacle.avis.length === 0 ? (
                                    <p className="text-muted-foreground">Soyez le premier à donner votre avis !</p>
                                ) : (
                                    <div className="space-y-4">
                                        {pestacle.avis.map((avis) => (
                                            <div key={avis.id} className="border-b pb-4 last:border-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold">{avis.auteur}</span>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i < avis.note
                                                                        ? "fill-accent text-accent"
                                                                        : "text-muted-foreground"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">{avis.commentaire}</p>
                                                <span className="text-xs text-muted-foreground">
                          {new Date(avis.date).toLocaleDateString("fr-FR")}
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
                                            <p className="text-sm text-muted-foreground">{pestacle.heure}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Lieu</p>
                                            <p className="text-sm text-muted-foreground">{pestacle.lieu}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Timer className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">Durée</p>
                                            <p className="text-sm text-muted-foreground">{pestacle.duree}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6 mb-6">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <span className="text-3xl font-bold text-accent">{pestacle.prix}€</span>
                                        <span className="text-sm text-muted-foreground">à partir de</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Pestacle du moment jusqu&apos;au {new Date(pestacle.dateFin).toLocaleDateString("fr-FR")}
                                    </p>
                                </div>

                                <Button size="lg" className="w-full mb-3 bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Réserver maintenant
                                </Button>

                                <Button size="lg" variant="outline" className="w-full" asChild>
                                    <Link href={`/spectacles/${pestacle.id}`}>
                                        Voir tous les détails
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Pourquoi ce spectacle */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-accent" />
                                    Pourquoi ce spectacle ?
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {pestacle.raison}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
