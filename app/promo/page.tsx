import { Headerpage } from "@/components/header-page"

export default function PromosPage() {
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Headerpage />
      <main className="flex-1">
        <div className="mt-20 bg-linear-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Offres exclusives
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Nos Promotions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Découvrez nos offres exclusives et bénéficiez de réductions fantastiques sur tous nos spectacles
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}