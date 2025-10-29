import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"

const upcomingShows = [
  {
    id: 1,
    title: "Les Misérables",
    venue: "Théâtre du Châtelet",
    date: "25 Mars 2025",
    time: "20h00",
    image: "/les-miserables-musical-theater.jpg",
    price: "52€",
  },
  {
    id: 2,
    title: "Notre-Dame de Paris",
    venue: "Palais des Congrès",
    date: "2 Avril 2025",
    time: "19h30",
    image: "/notre-dame-de-paris-musical.jpg",
    price: "58€",
  },
  {
    id: 3,
    title: "Hamlet",
    venue: "Comédie-Française",
    date: "10 Avril 2025",
    time: "20h30",
    image: "/hamlet-shakespeare-theater.jpg",
    price: "42€",
  },
  {
    id: 4,
    title: "Chicago",
    venue: "Théâtre Marigny",
    date: "18 Avril 2025",
    time: "20h00",
    image: "/chicago-musical-theater-jazz.jpg",
    price: "48€",
  },
]

export function UpcomingShows() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Prochainement</h2>
          <p className="text-muted-foreground text-lg">
            Réservez dès maintenant vos places pour les spectacles à venir
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingShows.map((show) => (
            <Card
              key={show.id}
              className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden">
                  <img
                    src={show.image || "/placeholder.svg"}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                      {show.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{show.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{show.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{show.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent">À partir de {show.price}</span>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Réserver</Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            Voir tous les spectacles à venir
          </Button>
        </div>
      </div>
    </section>
  )
}
