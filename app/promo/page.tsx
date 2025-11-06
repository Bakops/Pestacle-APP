"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromoCard } from "@/components/promo-card"
import { PromoFilters } from "@/components/promo-filters"
import { Badge } from "@/components/ui/badge"
import { getSpectaclesPromo, filterPromosSpectacles, type SpectaclePromo } from "@/lib/data/promos"
import { Percent, Sparkles, TrendingDown } from "lucide-react"

export default function PromoPage() {
    const [promos, setPromos] = useState<SpectaclePromo[]>([])
    const [filteredPromos, setFilteredPromos] = useState<SpectaclePromo[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedReduction, setSelectedReduction] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPromos = async () => {
            const data = await getSpectaclesPromo()
            setPromos(data)
            setFilteredPromos(data)
            setLoading(false)
        }
        loadPromos()
    }, [])

    useEffect(() => {
        const filtered = filterPromosSpectacles(promos, searchTerm, selectedReduction)
        setFilteredPromos(filtered)
    }, [searchTerm, selectedReduction, promos])

    // Calculer les statistiques
    const economieTotal = filteredPromos.reduce((acc, promo) =>
        acc + (promo.prixOriginal - promo.prix), 0
    )

    const reductionMoyenne = filteredPromos.length > 0
        ? Math.round(filteredPromos.reduce((acc, promo) => acc + promo.pourcentageReduction, 0) / filteredPromos.length)
        : 0

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-destructive/20 via-orange-500/20 to-yellow-500/20 py-12 md:py-16">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Percent className="h-8 w-8 text-destructive animate-pulse" />
                        <h1 className="text-4xl md:text-5xl font-bold text-center">
                            Promotions Exceptionnelles
                        </h1>
                        <Percent className="h-8 w-8 text-destructive animate-pulse" />
                    </div>
                    <p className="text-center text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                        Profitez de réductions incroyables sur nos meilleurs spectacles. Places limitées !
                    </p>

                    {/* Stats */}
                    {filteredPromos.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-4">
                            <Badge variant="outline" className="text-base px-4 py-2">
                                <TrendingDown className="h-4 w-4 mr-2" />
                                Jusqu'à {Math.max(...filteredPromos.map(p => p.pourcentageReduction))}% de réduction
                            </Badge>
                            <Badge variant="outline" className="text-base px-4 py-2">
                                <Sparkles className="h-4 w-4 mr-2" />
                                {filteredPromos.length} spectacle{filteredPromos.length > 1 ? 's' : ''} en promo
                            </Badge>
                            {economieTotal > 0 && (
                                <Badge variant="outline" className="text-base px-4 py-2">
                                    <Percent className="h-4 w-4 mr-2" />
                                    Économisez jusqu'à {economieTotal}€
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <main className="flex-1 container mx-auto px-6 py-12">
                <PromoFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedReduction={selectedReduction}
                    onReductionChange={setSelectedReduction}
                />

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Chargement des promotions...</p>
                    </div>
                ) : filteredPromos.length === 0 ? (
                    <div className="text-center py-12">
                        <Percent className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-2xl font-bold mb-2">Aucune promotion disponible</h2>
                        <p className="text-muted-foreground">
                            {promos.length === 0
                                ? "Revenez bientôt pour découvrir nos prochaines offres !"
                                : "Essayez de modifier vos filtres pour voir plus de résultats."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                {filteredPromos.length} promotion{filteredPromos.length > 1 ? 's' : ''} disponible{filteredPromos.length > 1 ? 's' : ''}
                                {reductionMoyenne > 0 && ` • Réduction moyenne: ${reductionMoyenne}%`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPromos.map((promo) => (
                                <PromoCard key={promo.id} spectacle={promo} />
                            ))}
                        </div>

                        {/* Bannière info en bas */}
                        <div className="mt-12 p-6 bg-accent/10 rounded-lg border-2 border-accent">
                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-accent" />
                                Comment profiter des promos ?
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Sélectionnez votre spectacle et cliquez sur "Réserver"</li>
                                <li>• Le prix promotionnel sera automatiquement appliqué</li>
                                <li>• Utilisez le code promo affiché sur la carte si nécessaire</li>
                                <li>• Les places en promotion sont limitées, ne tardez pas !</li>
                            </ul>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    )
}