"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SalleCard } from "@/components/salle-card"
import { SalleFilters } from "@/components/salle-filters"
import { SallesMap } from "@/components/salles-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSalles, filterSalles, type Salle } from "@/lib/data/salles"
import { Map, Grid } from "lucide-react"

export default function SallesPage() {
    const [salles, setSalles] = useState<Salle[]>([])
    const [filteredSalles, setFilteredSalles] = useState<Salle[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedVille, setSelectedVille] = useState("Toutes")
    const [selectedCapacite, setSelectedCapacite] = useState(0)
    const [loading, setLoading] = useState(true)

    // Charger les salles au montage
    useEffect(() => {
        const loadSalles = async () => {
            const data = await getSalles()
            setSalles(data)
            setFilteredSalles(data)
            setLoading(false)
        }
        loadSalles()
    }, [])

    // Appliquer les filtres quand ils changent
    useEffect(() => {
        const filtered = filterSalles(salles, searchTerm, selectedVille, selectedCapacite)
        setFilteredSalles(filtered)
    }, [searchTerm, selectedVille, selectedCapacite, salles])

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Toutes les salles</h1>
                    <p className="text-muted-foreground">
                        Découvrez les plus belles salles de spectacle
                    </p>
                </div>

                <SalleFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedVille={selectedVille}
                    onVilleChange={setSelectedVille}
                    selectedCapacite={selectedCapacite}
                    onCapaciteChange={setSelectedCapacite}
                />

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Chargement des salles...</p>
                    </div>
                ) : filteredSalles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Aucune salle trouvée</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-muted-foreground">
                            {filteredSalles.length} salle{filteredSalles.length > 1 ? 's' : ''} trouvée{filteredSalles.length > 1 ? 's' : ''}
                        </div>

                        <Tabs defaultValue="grid" className="w-full">
                            <TabsList className="mb-6">
                                <TabsTrigger value="grid" className="flex items-center gap-2">
                                    <Grid className="h-4 w-4" />
                                    Grille
                                </TabsTrigger>
                                <TabsTrigger value="map" className="flex items-center gap-2">
                                    <Map className="h-4 w-4" />
                                    Carte
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="grid">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredSalles.map((salle) => (
                                        <SalleCard
                                            key={salle.id}
                                            salle={salle}
                                            spectaclesCount={salle.spectaclesIds.length}
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="map">
                                <SallesMap salles={filteredSalles} />
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredSalles.map((salle) => (
                                        <div key={salle.id} className="p-4 border rounded-lg">
                                            <h3 className="font-semibold mb-1">{salle.nom}</h3>
                                            <p className="text-sm text-muted-foreground mb-1">{salle.adresse}</p>
                                            <p className="text-sm text-muted-foreground">{salle.capacite} places</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </main>
            <Footer />
        </div>
    )
}