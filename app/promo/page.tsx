"use client";
import { useState, useMemo } from "react"
import { Headerpage } from "@/components/header-page"
import { Footer } from "@/components/footer"
import PromoCard from "@/components/promo-card"
import { promotions } from "@/lib/promo-data"
import PestacleNewsletterSection from "@/components/sections-newsletter-pestacle"
import { Search, X } from "lucide-react"

export default function PromosPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("Toutes")
    const [searchQuery, setSearchQuery] = useState<string>("")

    // Extraire toutes les catégories uniques
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(promotions.map(promo => promo.category)))
        return ["Toutes", ...uniqueCategories]
    }, [])

    // Filtrer les promotions selon la catégorie et la recherche
    const filteredPromotions = useMemo(() => {
        return promotions.filter(promo => {
            const matchesCategory = selectedCategory === "Toutes" || promo.category === selectedCategory
            const matchesSearch = promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promo.code.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, searchQuery])

    const clearSearch = () => {
        setSearchQuery("")
    }

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
                        {/* Search Bar */}
                        <div className="mb-8">
                            <div className="relative w-full max-w-3xl mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-[#FF6B6B] pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Rechercher un spectacle, un code promo..."
                                        className="w-full h-15 pl-16 pr-16 text-lg bg-white rounded-3xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/30 text-gray-900 placeholder:text-gray-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <X className="h-6 w-6 text-[#FF6B6B]" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Header with count and filters */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    Offres du moment
                                </h2>
                                <p className="text-gray-600">
                                    {filteredPromotions.length} promotion{filteredPromotions.length > 1 ? 's' : ''} disponible{filteredPromotions.length > 1 ? 's' : ''}
                                    {searchQuery && (
                                        <span className="ml-2 text-[#4ECDC4] font-medium">
                                            pour "{searchQuery}"
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Category Filter Buttons */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                            selectedCategory === category
                                                ? "bg-[#4ECDC4] text-white shadow-lg scale-105"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Promotions Grid */}
                        {filteredPromotions.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPromotions.map((promo) => (
                                    <PromoCard key={promo.id} promo={promo} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Aucune promotion trouvée
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Essayez de modifier vos critères de recherche ou votre filtre
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedCategory("Toutes")
                                    }}
                                    className="px-6 py-3 bg-[#4ECDC4] text-white rounded-full font-medium hover:bg-[#5218CC] transition-colors"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <PestacleNewsletterSection />
            </main>
            <Footer />
        </div>
    )
}