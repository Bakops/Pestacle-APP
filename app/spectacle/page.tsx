import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Headerpage } from "@/components/header-page"
import { Footer } from "@/components/footer"
import { getSpectacles } from "@/lib/api"
import { Spectacle } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Ticket } from "lucide-react"
import SpectacleCardClient from "@/components/SpectacleCardClient"

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
            <SpectacleCardClient key={spectacle.id} spectacle={spectacle} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
