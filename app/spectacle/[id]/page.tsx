import { HeaderPage } from "@/components/header-page"
import { Footer } from "@/components/footer"

import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Ticket, Clock, Euro, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"
import { getSpectacleById } from "@/lib/api"

interface SpectacleDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SpectacleDetailPage({ params }: SpectacleDetailPageProps) {
  const { id } = await params
  let spectacle
  
  try {
    spectacle = await getSpectacleById(Number(id))
  } catch (error) {
    notFound()
  }

  const formatDate = (value: string) => {
    const date = new Date(value)
    return date.toLocaleDateString("fr-FR", { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (value: string) => {
    const date = new Date(value)
    return date.toLocaleTimeString("fr-FR", { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const placesRestantes = spectacle.placesDisponibles
  const pourcentageOccupation = ((spectacle.capaciteTotale - spectacle.placesDisponibles) / spectacle.capaciteTotale) * 100

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <HeaderPage />
      <main className="flex-1">
        {/* Hero Section Amélioré */}
        <div className="mt-20 relative h-[450px] md:h-[550px] overflow-hidden group">
          {spectacle.imageUrl ? (
            <>
              <img
                src={spectacle.imageUrl}
                alt={spectacle.titre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#4ECDC4] to-[#44B3B0] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              </div>
              <Ticket className="w-32 h-32 text-white/80 relative z-10" />
            </div>
          )}



          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <Badge
                    className={`border-0 font-semibold px-4 py-2 rounded-full shadow-lg text-sm backdrop-blur-md ${
                      spectacle.statut === "DISPONIBLE"
                        ? "bg-[#4ECDC4] text-white"
                        : spectacle.statut === "COMPLET"
                        ? "bg-[#FF6B6B] text-white"
                        : spectacle.statut === "ANNULE"
                        ? "bg-gray-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {spectacle.statut}
                  </Badge>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">4.8/5</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                  {spectacle.titre}
                </h1>
                <div className="flex items-center gap-6 text-white/95 flex-wrap">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                    <Calendar className="h-5 w-5 text-[#4ECDC4]" />
                    <span className="font-medium">{formatDate(spectacle.dateHeure)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                    <Clock className="h-5 w-5 text-[#4ECDC4]" />
                    <span className="font-medium">{formatTime(spectacle.dateHeure)}</span>
                  </div>
                </div>
              </div>
              <Link href="/spectacle" className="hidden md:block">
                <Button className="text-black border-2 border-white hover:bg-white/10 bg-white/5 backdrop-blur-md font-semibold transition-all duration-300 hover:scale-105">
                  ← Retour
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="group">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#4ECDC4] rounded-full" />
                    À propos
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-[#4ECDC4]/5 to-[#44B3B0]/5 border border-[#4ECDC4]/20 rounded-xl p-8 hover:border-[#4ECDC4]/40 transition-all duration-300">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {spectacle.description || "Aucune description disponible pour le moment."}
                  </p>
                </div>
              </div>

              {/* Informations pratiques */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#4ECDC4] rounded-full" />
                  Infos pratiques
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { icon: MapPin, label: "Lieu", value: spectacle.lieu || "À définir", color: "from-blue-500 to-blue-600" },
                    { icon: Calendar, label: "Date", value: formatDate(spectacle.dateHeure), color: "from-purple-500 to-purple-600" },
                    { icon: Clock, label: "Heure", value: formatTime(spectacle.dateHeure), color: "from-orange-500 to-orange-600" },
                    { icon: Users, label: "Capacité", value: `${spectacle.capaciteTotale} places`, color: "from-pink-500 to-pink-600" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-5 hover:border-[#4ECDC4] hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">{item.label}</p>
                          <p className="text-gray-900 font-bold text-sm">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-2xl sticky top-32 overflow-hidden">
                <div className="h-1 bg-linear-to-r from-[#4ECDC4] to-[#FF6B6B]" />
                <CardContent className="p-8">
                  {/* Prix */}
                  <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-3">À partir de</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Euro className="h-8 w-8 text-[#4ECDC4]" />
                      <p className="text-5xl font-bold text-[#4ECDC4]">
                        {spectacle.prixUnitaire.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-gray-600 font-medium">par personne</p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

                  {/* Disponibilité */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-semibold">Disponibilité</span>
                      <span className={`font-bold text-sm px-3 py-1 rounded-full ${
                        placesRestantes > 50 ? 'bg-green-100 text-green-700' : 
                        placesRestantes > 20 ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {placesRestantes} places
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 shadow-md ${
                          pourcentageOccupation < 50 ? 'bg-linear-to-r from-green-400 to-green-500' :
                          pourcentageOccupation < 80 ? 'bg-linear-to-r from-orange-400 to-orange-500' :
                          'bg-linear-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${pourcentageOccupation}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center font-medium">
                      {Math.round(pourcentageOccupation)}% de remplissage
                    </p>
                  </div>

                  {/* Bouton Ajouter au panier */}
                  <AddToCartButton spectacle={spectacle} />

                  {spectacle.statut !== "DISPONIBLE" && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                      <p className="text-sm font-medium text-amber-900">
                        {spectacle.statut === "COMPLET" && "🚫 Ce spectacle est complet"}
                        {spectacle.statut === "ANNULE" && "⚠️ Ce spectacle a été annulé"}
                        {spectacle.statut === "TERMINE" && "✓ Ce spectacle est terminé"}
                      </p>
                    </div>
                  )}

                  {/* Info supplémentaire */}
                  <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300 cursor-pointer group">
                      <div className="p-2 bg-[#4ECDC4]/10 rounded-lg group-hover:bg-[#4ECDC4]/20 transition-all">
                        <Ticket className="h-4 w-4 text-[#4ECDC4]" />
                      </div>
                      <span className="font-medium">Billet électronique avec QR code</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300 cursor-pointer group">
                      <div className="p-2 bg-[#4ECDC4]/10 rounded-lg group-hover:bg-[#4ECDC4]/20 transition-all">
                        <Users className="h-4 w-4 text-[#4ECDC4]" />
                      </div>
                      <span className="font-medium">Réservation instantanée</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
