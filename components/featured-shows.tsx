"use client";

import { useState, useEffect } from "react"
import { CardSpectacle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getSpectacles } from "@/lib/api"
import { Spectacle } from "@/lib/types"
import Link from "next/link"

export function FeaturedShows() {
    const [apiSpectacles, setApiSpectacles] = useState<Spectacle[]>([])
    const [loading, setLoading] = useState(true)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
        const fetchSpectacles = async () => {
            try {
                const spectacles = await getSpectacles()
                setApiSpectacles(spectacles.slice(0, 3)) // Prendre les 3 premiers
            } catch (error) {
                console.error("Erreur lors du chargement des spectacles:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSpectacles()
    }, [])

    // Combiner les spectacles hardcodés avec les spectacles de l'API
    const allShows = isHydrated
        ? [
            ...apiSpectacles.map((spectacle) => ({
                id: spectacle.id + 100, // ID décalé pour éviter les doublons
                title: spectacle.titre,
                category: "Spectacle",
                image: spectacle.imageUrl || "/placeholder.jpg",
                description: spectacle.description || "Spectacle à découvrir",
                rating: 4.7,
                price: `À partir de ${spectacle.prixUnitaire.toFixed(0)}€`,
                badge: spectacle.statut === "DISPONIBLE" ? "Disponible" : null,
                spectacleId: spectacle.id, // Stocker l'ID réel pour la navigation
            }))
        ]
        : []

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                            Spectacles à l'affiche
                        </h2>
                        <p className="text-black/60 text-lg">
                            Découvrez nos productions les plus populaires
                        </p>
                    </div>
                    <Link href="/spectacle">
                        <Button 
                            variant="outline" 
                            className="hidden md:flex bg-[#FF6B6B] hover:bg-black hover:text-white text-white border border-black/20 hover:border-black/30 font-medium h-11 px-6 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            Voir tout
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allShows.map((show) => (
                        <Link
                            key={show.id}
                            href={show.spectacleId ? `/spectacle/${show.spectacleId}` : "#"}
                        >
                        <CardSpectacle
                            className="group overflow-hidden border-0 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                <img
                                    src={show.image}
                                    alt={show.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                {show.badge && (
                                    <Badge className="absolute top-4 right-4 bg-[#4ECDC4] text-white border-0 font-medium px-3 py-1 rounded-full shadow-lg">
                                        {show.badge}
                                    </Badge>
                                )}
                                <div className="absolute inset-0 from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                
                                <Button className="absolute bottom-6 left-6 right-6 bg-[#4ECDC4] hover:bg-[#FF6B6B] text-white font-medium h-12 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                                    Réserver maintenant
                                </Button>
                            </div>

                            <CardContent className="pr-5 pl-5 pb-4 bg-white">
                                <div className="flex items-center justify-between mb-2 pt-4">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{show.category}</span>
                                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-semibold text-gray-900">{show.rating}</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#4ECDC4] transition-colors duration-300">
                                    {show.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{show.description}</p>
                                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                                    <p className="text-[#4ECDC4] font-bold text-xl">{show.price}</p>
                                    <span className="text-[10px] text-gray-400 font-medium">par personne</span>
                                </div>
                            </CardContent>
                        </CardSpectacle>
                    </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/spectacle">
                        <Button 
                            variant="outline" 
                            className="w-full bg-black/5 hover:bg-black/10 text-black border border-black/20 hover:border-black/30 font-medium h-11 rounded-full transition-all duration-300"
                        >
                            Voir tous les spectacles
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}