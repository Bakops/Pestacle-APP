"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SpectacleCard } from "@/components/spectacle-card"
import { SpectacleFilters } from "@/components/spectacle-filters"
import { getSpectacles, filterSpectacles, type Spectacle } from "@/lib/data/spectacles"

export default function SpectaclesPage() {
    const [spectacles, setSpectacles] = useState<Spectacle[]>([])
    const [filteredSpectacles, setFilteredSpectacles] = useState<Spectacle[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategorie, setSelectedCategorie] = useState("Toutes")
    const [selectedDate, setSelectedDate] = useState("")
    const [loading, setLoading] = useState(true)

    // Charger les spectacles au montage
    useEffect(() => {
        const loadSpectacles = async () => {
            const data = await getSpectacles()
            setSpectacles(data)
            setFilteredSpectacles(data)
            setLoading(false)
        }
        loadSpectacles()
    }, [])

    // Appliquer les filtres quand ils changent
    useEffect(() => {
        const filtered = filterSpectacles(spectacles, searchTerm, selectedCategorie, selectedDate)
        setFilteredSpectacles(filtered)
    }, [searchTerm, selectedCategorie, selectedDate, spectacles])

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Tous les spectacles</h1>
                    <p className="text-muted-foreground">
                        Découvrez notre sélection de spectacles à ne pas manquer
                    </p>
                </div>

                <SpectacleFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategorie={selectedCategorie}
                    onCategorieChange={setSelectedCategorie}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Chargement des spectacles...</p>
                    </div>
                ) : filteredSpectacles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Aucun spectacle trouvé</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-muted-foreground">
                            {filteredSpectacles.length} spectacle{filteredSpectacles.length > 1 ? 's' : ''} trouvé{filteredSpectacles.length > 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredSpectacles.map((spectacle) => (
                                <SpectacleCard key={spectacle.id} spectacle={spectacle} />
                            ))}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    )
}