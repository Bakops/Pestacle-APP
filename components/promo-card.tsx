import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Percent, Tag, TrendingDown } from "lucide-react"
import type { SpectaclePromo } from "@/lib/data/promos"

interface PromoCardProps {
    spectacle: SpectaclePromo
}

export function PromoCard({ spectacle }: PromoCardProps) {
    const formattedDate = new Date(spectacle.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const joursRestants = Math.ceil(
        (new Date(spectacle.dateFinPromo).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )

    return (
        <Link href={`/spectacles/${spectacle.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full relative">
                {/* Badge promo en haut à gauche */}
                <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-destructive text-destructive-foreground font-bold text-base px-3 py-1">
                        -{spectacle.pourcentageReduction}%
                    </Badge>
                </div>

                <div className="relative h-48 overflow-hidden">
                    <img
                        src={spectacle.image}
                        alt={spectacle.titre}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                        {spectacle.categorie}
                    </Badge>

                    {/* Indicateur de stock limité */}
                    {spectacle.stock && spectacle.stock < 30 && (
                        <Badge className="absolute bottom-2 right-2 bg-orange-500 text-white">
                            Plus que {spectacle.stock} places !
                        </Badge>
                    )}
                </div>

                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{spectacle.titre}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {spectacle.description}
                    </p>

                    <div className="space-y-1 text-sm mb-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{spectacle.heure}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{spectacle.lieu}</span>
                        </div>
                    </div>

                    {/* Alerte fin de promo */}
                    {joursRestants <= 7 && (
                        <div className="flex items-center gap-2 text-orange-600 text-xs font-semibold bg-orange-50 dark:bg-orange-950 px-2 py-1 rounded">
                            <TrendingDown className="h-3 w-3" />
                            Promo se termine dans {joursRestants} jour{joursRestants > 1 ? 's' : ''}
                        </div>
                    )}

                    {/* Code promo */}
                    {spectacle.codePromo && (
                        <div className="mt-2 flex items-center gap-2 text-xs bg-accent/20 px-2 py-1 rounded">
                            <Tag className="h-3 w-3" />
                            <span className="font-mono font-semibold">{spectacle.codePromo}</span>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <div className="w-full">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-2xl font-bold text-destructive">{spectacle.prix}€</span>
                            <span className="text-sm text-muted-foreground line-through">{spectacle.prixOriginal}€</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <Percent className="h-3 w-3" />
                            Économisez {spectacle.prixOriginal - spectacle.prix}€
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}