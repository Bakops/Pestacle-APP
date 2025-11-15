import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"

const upcomingShows = [
  {
    id: 1,
    title: "Les Misérables",
    venue: "Théâtre du Châtelet",
    date: "25 Mars 2026",
    time: "20h00",
    image: "/les-miserables-musical-theater.jpg",
    price: "52€",
  },
  {
    id: 2,
    title: "Notre-Dame de Paris",
    venue: "Palais des Congrès",
    date: "2 Avril 2026",
    time: "19h30",
    image: "/notre-dame-de-paris-musical.jpg",
    price: "58€",
  },
  {
    id: 3,
    title: "Hamlet",
    venue: "Comédie-Française",
    date: "10 Avril 2026",
    time: "20h30",
    image: "/hamlet-shakespeare-theater.jpg",
    price: "42€",
  },
  {
    id: 4,
    title: "Chicago",
    venue: "Théâtre Marigny",
    date: "18 Avril 2026",
    time: "20h00",
    image: "/chicago-musical-theater-jazz.jpg",
    price: "48€",
  },
]

export function UpcomingShows() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-gray-900 to-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-block bg-white px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#FF6B6B]">
              Prochainement
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ne manquez pas nos spectacles à venir
          </h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Découvrez notre sélection de spectacles à venir et réservez vos places dès maintenant pour vivre des expériences inoubliables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingShows.map((show) => (
            <Card
              key={show.id}
              className="group overflow-hidden border-0 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative sm:w-2/5 aspect-16/10 sm:aspect-auto overflow-hidden sm:rounded-l-2xl">
                  <img
                    src={show.image || "/placeholder.svg"}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <CardContent className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#4ECDC4] transition-colors duration-300">
                      {show.title}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#4ECDC4]/10 transition-colors duration-300">
                          <MapPin className="h-4 w-4 text-gray-600 group-hover:text-[#4ECDC4] transition-colors duration-300" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{show.venue}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#4ECDC4]/10 transition-colors duration-300">
                          <Calendar className="h-4 w-4 text-gray-600 group-hover:text-[#4ECDC4] transition-colors duration-300" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{show.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#4ECDC4]/10 transition-colors duration-300">
                          <Clock className="h-4 w-4 text-gray-600 group-hover:text-[#4ECDC4] transition-colors duration-300" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{show.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">À partir de</p>
                      <span className="text-2xl font-bold text-[#FF6B6B]">{show.price}</span>
                    </div>
                    <Button className="bg-[#4ECDC4] hover:bg-[#000000] text-white font-medium h-11 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            
            className="bg-[#4ECDC4] hover:bg-[#FF6B6B] hover:text-white text-white font-medium h-12 px-8 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Voir tous les spectacles à venir
          </Button>
        </div>
      </div>
    </section>
  )
}