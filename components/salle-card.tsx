import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar } from "lucide-react"
import type { Salle } from "@/lib/data/salles"

interface SalleCardProps {
    salle: Salle
    spectaclesCount?: number
}

export function SalleCard({ salle, spectaclesCount = 0 }: SalleCardProps) {
    return (
        <Link href={`/salles/${salle.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={salle.photo}
                        alt={salle.nom}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                        {salle.ville}
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{salle.nom}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {salle.description}
                    </p>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{salle.adresse}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{salle.capacite} places</span>
                        </div>
                        {spectaclesCount > 0 && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{spectaclesCount} spectacle{spectaclesCount > 1 ? 's' : ''} programmé{spectaclesCount > 1 ? 's' : ''}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <div className="flex flex-wrap gap-1">
                        {salle.equipements.slice(0, 3).map((equip, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {equip}
                            </Badge>
                        ))}
                        {salle.equipements.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{salle.equipements.length - 3}
                            </Badge>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}