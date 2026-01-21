import { Headerpage } from "@/components/header-page"
import { Footer } from "@/components/footer"
import { getSpectacleById } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Ticket, Clock, Euro } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Headerpage />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="mt-20 relative h-[400px] md:h-[500px] overflow-hidden">
          {spectacle.imageUrl ? (
            <>
              <img
                src={spectacle.imageUrl}
                alt={spectacle.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Ticket className="w-32 h-32 text-gray-600" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                className={`border-0 font-medium px-4 py-1.5 rounded-full shadow-lg text-sm ${
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
              <Link href="/spectacle">
                <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                  ← Retour aux spectacles
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {spectacle.titre}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{formatDate(spectacle.dateHeure)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{formatTime(spectacle.dateHeure)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {spectacle.description || "Aucune description disponible pour le moment."}
                  </p>
                </CardContent>
              </Card>

              {/* Informations pratiques */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations pratiques</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#4ECDC4]/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Lieu</p>
                        <p className="text-gray-900 font-semibold">{spectacle.lieu || "À définir"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#4ECDC4]/10 rounded-lg">
                        <Calendar className="h-5 w-5 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Date</p>
                        <p className="text-gray-900 font-semibold">{formatDate(spectacle.dateHeure)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#4ECDC4]/10 rounded-lg">
                        <Clock className="h-5 w-5 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Heure</p>
                        <p className="text-gray-900 font-semibold">{formatTime(spectacle.dateHeure)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#4ECDC4]/10 rounded-lg">
                        <Users className="h-5 w-5 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Capacité</p>
                        <p className="text-gray-900 font-semibold">
                          {spectacle.capaciteTotale} places
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Euro className="h-6 w-6 text-[#4ECDC4]" />
                      <p className="text-4xl font-bold text-[#4ECDC4]">
                        {spectacle.prixUnitaire.toFixed(2)} €
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">par personne</p>
                  </div>

                  {/* Disponibilité */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">Disponibilité</span>
                      <span className={`font-bold ${
                        placesRestantes > 50 ? 'text-green-600' : 
                        placesRestantes > 20 ? 'text-orange-600' : 
                        'text-red-600'
                      }`}>
                        {placesRestantes} places restantes
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          pourcentageOccupation < 50 ? 'bg-green-500' :
                          pourcentageOccupation < 80 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${pourcentageOccupation}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {Math.round(pourcentageOccupation)}% de remplissage
                    </p>
                  </div>

                  <AddToCartButton spectacle={spectacle} />

                  {spectacle.statut !== "DISPONIBLE" && (
                    <p className="text-sm text-gray-500 text-center mt-4">
                      {spectacle.statut === "COMPLET" && "Ce spectacle est complet"}
                      {spectacle.statut === "ANNULE" && "Ce spectacle a été annulé"}
                      {spectacle.statut === "TERMINE" && "Ce spectacle est terminé"}
                    </p>
                  )}

                  {/* Info supplémentaire */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Ticket className="h-4 w-4" />
                      <span>Billet électronique</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Réservation instantanée</span>
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
