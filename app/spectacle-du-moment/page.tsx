import SalleCard from "@/components/salle-card"
import { Headerpage } from "@/components/header-page"

export default function SpectacleDuMomentPage() {
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
                Nos spectacle du moment
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Nos spectacle du moment</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Découvrez les spectacle du moment organiser aux sein de nos salles.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
