import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import type { Spectacle } from "@/lib/data/spectacles"

interface SpectacleCardProps {
    spectacle: Spectacle
}

export function SpectacleCard({ spectacle }: SpectacleCardProps) {
    const formattedDate = new Date(spectacle.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <Link href={`/spectacles/${spectacle.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={spectacle.image}
                        alt={spectacle.titre}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                        {spectacle.categorie}
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{spectacle.titre}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {spectacle.description}
                    </p>
                    <div className="space-y-1 text-sm">
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
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <div className="w-full flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{spectacle.prix}€</span>
                        <span className="text-sm text-muted-foreground">à partir de</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}