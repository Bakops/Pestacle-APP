import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Headerpage } from "@/components/header-page"
import { getSpectacles } from "@/lib/api"
import { Spectacle } from "@/lib/types"

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
            <Card key={spectacle.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-xl">
              <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                {spectacle.imageUrl ? (
                  <img 
                    src={spectacle.imageUrl} 
                    alt={spectacle.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    spectacle.statut === "DISPONIBLE" ? "bg-green-500/90 text-white" :
                    spectacle.statut === "COMPLET" ? "bg-red-500/90 text-white" :
                    spectacle.statut === "ANNULE" ? "bg-gray-500/90 text-white" :
                    "bg-blue-500/90 text-white"
                  }`}>
                    {spectacle.statut}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#4ECDC4] transition-colors line-clamp-2">
                  {spectacle.titre}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{formatDate(spectacle.dateHeure)}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 pt-0">
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {spectacle.description || "Pas de description pour le moment."}
                </p>
                
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{spectacle.lieu ?? "À venir"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-lg font-bold text-[#4ECDC4]">{spectacle.prixUnitaire.toFixed(2)} €</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm">
                        <span className="font-semibold text-gray-900">{spectacle.placesDisponibles}</span>
                        <span className="text-gray-500">/{spectacle.capaciteTotale}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-linear-to-r from-[#4ECDC4] to-[#44B3B0] text-white font-semibold py-2.5 px-4 rounded-lg hover:from-[#44B3B0] hover:to-[#3A9A97] transition-all duration-300 shadow-md hover:shadow-lg">
                  Réserver maintenant
                </button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
