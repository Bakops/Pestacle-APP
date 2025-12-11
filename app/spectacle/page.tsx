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

        <section className="container mx-auto px-6 py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spectacles.map((spectacle: Spectacle) => (
            <Card key={spectacle.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{spectacle.titre}</CardTitle>
                <p className="text-sm text-muted-foreground">{formatDate(spectacle.dateHeure)}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {spectacle.description || "Pas de description pour le moment."}
                </p>
                <div className="text-sm">
                  <p className="font-medium">Lieu: <span className="font-normal">{spectacle.lieu ?? "À venir"}</span></p>
                  <p className="font-medium">Prix: <span className="font-normal">{spectacle.prixUnitaire.toFixed(2)} €</span></p>
                  <p className="font-medium">Places dispo: <span className="font-normal">{spectacle.placesDisponibles}</span></p>
                  <p className="font-medium">Capacité totale: <span className="font-normal">{spectacle.capaciteTotale}</span></p>
                  <p className="font-medium">Statut: <span className="font-normal">{spectacle.statut}</span></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
