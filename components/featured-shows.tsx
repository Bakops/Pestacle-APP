import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const featuredShows = [
  {
    id: 1,
    title: "Roméo et Juliette",
    category: "Comédie Musicale",
    image: "/romeo-and-juliet-musical-theater-performance.jpg",
    rating: 4.8,
    price: "À partir de 45€",
    badge: "Nouveauté",
  },
  {
    id: 2,
    title: "Le Roi Lion",
    category: "Spectacle Musical",
    image: "/lion-king-musical-theater-colorful.jpg",
    rating: 4.9,
    price: "À partir de 65€",
    badge: "Populaire",
  },
  {
    id: 3,
    title: "Cyrano de Bergerac",
    category: "Théâtre Classique",
    image: "/cyrano-de-bergerac-classic-theater.jpg",
    rating: 4.7,
    price: "À partir de 35€",
    badge: null,
  },
]

export function FeaturedShows() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Spectacles à l'affiche</h2>
            <p className="text-muted-foreground text-lg">Découvrez nos productions les plus populaires</p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            Voir tout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredShows.map((show) => (
            <Card
              key={show.id}
              className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={show.image || "/placeholder.svg"}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {show.badge && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{show.badge}</Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Réserver</Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">{show.category}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">{show.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {show.title}
                </h3>
                <p className="text-accent font-semibold">{show.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full bg-transparent">
            Voir tous les spectacles
          </Button>
        </div>
      </div>
    </section>
  )
}
