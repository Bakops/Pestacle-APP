import { Headerpage } from "@/components/header-page"
import { Footer } from "@/components/footer"
import PromoCard from "@/components/promo-card"
import { promotions } from "@/lib/promo-data"
import PestacleNewsletterSection from "@/components/sections-newsletter-pestacle"

export default function PromosPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Headerpage />
            <main className="flex-1">
                {/* Hero Section */}
                <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                🎉 Offres exclusives
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

                {/* Promotions Grid */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    Offres du moment
                                </h2>
                                <p className="text-gray-600">
                                    {promotions.length} promotions disponibles
                                </p>
                            </div>

                            {/* Optional: Filter buttons */}
                            <div className="hidden md:flex gap-2">
                                <button className="px-4 py-2 rounded-full bg-[#4ECDC4] text-white font-medium hover:bg-[#5218CC] transition-colors">
                                    Toutes
                                </button>
                                <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors">
                                    Comédie Musicale
                                </button>
                                <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors">
                                    Théâtre
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {promotions.map((promo) => (
                                <PromoCard key={promo.id} promo={promo} />
                            ))}
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <PestacleNewsletterSection />
            </main>
            <Footer />
        </div>
    )
}