import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="/elegant-theater-stage-with-red-curtains-and-dramat.jpg"
          alt="Spectacle vedette"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 h-full flex items-end pb-20">
        <div className="max-w-2xl">
          <div className="inline-block bg-accent px-4 py-1.5 rounded mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              Spectacle vedette
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">Le Fantôme de l'Opéra</h1>

          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Une production spectaculaire qui vous transportera dans l'univers mystérieux et romantique du chef-d'œuvre
            d'Andrew Lloyd Webber.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12">
              Réserver
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold px-8 h-12"
            >
              <Play className="h-4 w-4 mr-2" />
              Bande-annonce
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
