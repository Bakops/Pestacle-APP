import { spectaclesData, type Spectacle } from "./spectacles"

export interface SpectaclePromo extends Spectacle {
    prixOriginal: number
    pourcentageReduction: number
    dateDebutPromo: string
    dateFinPromo: string
    stock?: number // Places restantes en promo
    codePromo?: string
}

// Calculer le prix réduit
export function calculatePrixReduit(prixOriginal: number, pourcentage: number): number {
    return Math.round(prixOriginal * (1 - pourcentage / 100))
}

// Données des spectacles en promo
export const spectaclesPromo: SpectaclePromo[] = [
    {
        ...spectaclesData[0],
        prixOriginal: 45,
        prix: calculatePrixReduit(45, 30),
        pourcentageReduction: 30,
        dateDebutPromo: "2025-10-15",
        dateFinPromo: "2025-11-15",
        stock: 50,
        codePromo: "PROMO30"
    },
    {
        ...spectaclesData[1],
        prixOriginal: 55,
        prix: calculatePrixReduit(55, 25),
        pourcentageReduction: 25,
        dateDebutPromo: "2025-10-20",
        dateFinPromo: "2025-11-20",
        stock: 30,
        codePromo: "HAMLET25"
    },
    {
        ...spectaclesData[2],
        prixOriginal: 70,
        prix: calculatePrixReduit(70, 20),
        pourcentageReduction: 20,
        dateDebutPromo: "2025-11-01",
        dateFinPromo: "2025-12-01",
        stock: 100,
        codePromo: "OPERA20"
    },
    {
        ...spectaclesData[3],
        prixOriginal: 60,
        prix: calculatePrixReduit(60, 35),
        pourcentageReduction: 35,
        dateDebutPromo: "2025-10-25",
        dateFinPromo: "2025-11-25",
        stock: 20,
        codePromo: "BALLET35"
    }
]

// Fonction pour récupérer tous les spectacles en promo
export async function getSpectaclesPromo(): Promise<SpectaclePromo[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Filtrer uniquement les promos actives
            const now = new Date()
            const promosActives = spectaclesPromo.filter(promo => {
                const debut = new Date(promo.dateDebutPromo)
                const fin = new Date(promo.dateFinPromo)
                return now >= debut && now <= fin
            })
            resolve(promosActives)
        }, 100)
    })
}

// Fonction pour filtrer les promos
export function filterPromosSpectacles(
    promos: SpectaclePromo[],
    searchTerm: string,
    minReduction?: number
): SpectaclePromo[] {
    return promos.filter(promo => {
        const matchSearch =
            promo.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchReduction = !minReduction || promo.pourcentageReduction >= minReduction

        return matchSearch && matchReduction
    })
}

// Options de filtre par réduction
export const reductionOptions = [
    { label: "Toutes les promos", value: 0 },
    { label: "20% et plus", value: 20 },
    { label: "30% et plus", value: 30 },
    { label: "40% et plus", value: 40 },
    { label: "50% et plus", value: 50 }
]