import SalleCard from "@/components/salle-card"
import { HeaderPage } from "@/components/header-page"

export default function SallesPage() {

   const salles = [
    {
      id: 1,
      name: "Salle Principale",
      image: "/image-spectale1.jpg",
      capacity: 500,
      amenities: ["Climatisation", "Accessibilité PMR", "Parking"],
      features: ["Scène équipée", "Système son Dolby", "Éclairage professionnel"],
      address: "123 Avenue de l'Opéra, 75001 Paris",
      description: "Notre plus grande salle, équipée des dernières technologies de spectacle.",
    },
    {
      id: 2,
      name: "Salle Intime",
      image: "/image-spectale2.jpg",
      capacity: 150,
      amenities: ["Climatisation", "Accessibilité PMR"],
      features: ["Configuration flexible", "Éclairage modulable"],
      address: "123 Avenue de l'Opéra, 75001 Paris",
      description: "Parfaite pour les spectacles en petit comité et les performances intimes.",
    },
    {
      id: 3,
      name: "Studio Expérimental",
      image: "/image-spectale3.jpg",
      capacity: 80,
      amenities: ["Climatisation"],
      features: ["Espace polyvalent", "Technologie audio-visuelle"],
      address: "456 Rue des Spectacles, 75002 Paris",
      description: "Dédiée aux créations expérimentales et aux jeunes artistes.",
    },
    {
      id: 4,
      name: "Grand Théâtre",
      image: "/image-spectale4.jpg",
      capacity: 800,
      amenities: ["Climatisation", "Accessibilité PMR", "Parking", "Restaurant"],
      features: ["Orchestre complet", "Fosse d'orchestre", "Système son avancé"],
      address: "789 Place du Théâtre, 75003 Paris",
      description: "Notre joyau historique pour les grandes productions et spectacles prestigieux.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderPage />
      <main className="flex-1">
        <div className="mt-20 bg-linear-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Nos espaces
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Nos Salles</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Découvrez les espaces exceptionnels qui accueillent nos plus beaux spectacles.
            </p>
          </div>
        </div>
      </main>
      <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 space-y-8">
            {salles.map((salle) => (
              <SalleCard key={salle.id} salle={salle} />
            ))}
          </div>
        </section>
    </div>
  )
}
