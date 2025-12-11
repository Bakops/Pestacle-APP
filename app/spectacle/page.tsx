import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Headerpage } from "@/components/header-page"
import { getSpectacles } from "@/lib/api"
import { Spectacle } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Ticket } from "lucide-react"

function formatDate(value: string) {
  const date = new Date(value)
  return date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })
}

export default async function SpectaclePage() {
  const spectacles = await getSpectacles()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Headerpage />
      <main className="flex-1">
        <div className="mt-20 bg-linear-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Nos spectacles
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Nos spectacles</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Découvrez les spectacles organisés dans nos salles.
            </p>
          </div>
        </div>

        <section className="container mx-auto px-6 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {spectacles.map((spectacle: Spectacle) => (
            <Card 
              key={spectacle.id} 
              className="group overflow-hidden border-0 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                {spectacle.imageUrl ? (
                  <img 
                    src={spectacle.imageUrl} 
                    alt={spectacle.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                    <Ticket className="w-20 h-20 text-gray-400" />
                  </div>
                )}
                
                <Badge className={`absolute top-4 right-4 border-0 font-medium px-3 py-1 rounded-full shadow-lg ${
                  spectacle.statut === "DISPONIBLE" ? "bg-[#4ECDC4] text-white" :
                  spectacle.statut === "COMPLET" ? "bg-[#FF6B6B] text-white" :
                  spectacle.statut === "ANNULE" ? "bg-gray-500 text-white" :
                  "bg-blue-500 text-white"
                }`}>
                  {spectacle.statut}
                </Badge>

                <div className="absolute inset-0 from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <button className="absolute bottom-6 left-6 right-6 bg-[#4ECDC4] hover:bg-[#FF6B6B] text-white font-medium h-12 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  Réserver maintenant
                </button>
              </div>

              <CardContent className="pr-5 pl-5 pb-4 bg-white">
                <div className="flex items-center gap-2 mb-2 pt-4">
                  <Calendar className="h-3.5 w-3.5 text-[#4ECDC4]" />
                  <span className="text-xs font-medium text-gray-600">{formatDate(spectacle.dateHeure)}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#4ECDC4] transition-colors duration-300">
                  {spectacle.titre}
                </h3>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {spectacle.description || "Pas de description pour le moment."}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-700 font-medium truncate">{spectacle.lieu ?? "À venir"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Users className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">{spectacle.placesDisponibles}</span>
                      <span className="text-gray-500"> / {spectacle.capaciteTotale}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <p className="text-[#4ECDC4] font-bold text-xl">{spectacle.prixUnitaire.toFixed(2)} €</p>
                  <span className="text-[10px] text-gray-400 font-medium">par personne</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
