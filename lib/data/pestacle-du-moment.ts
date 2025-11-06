import { spectaclesData, type Spectacle } from "./spectacles"

export interface PestacleSpotlight extends Spectacle {
    raison: string // Pourquoi c'est le pestacle du moment
    dateDebut: string // Date de début de mise en avant
    dateFin: string // Date de fin de mise en avant
    videoUrl?: string // URL d'une vidéo de présentation
    critiques: Critique[]
}

export interface Critique {
    id: string
    source: string
    auteur: string
    extrait: string
    note: number
    lien?: string
}

// Le pestacle du moment (normalement géré par une API/admin)
export const pestacleSpotlight: PestacleSpotlight = {
    ...spectaclesData[0], // On prend le premier spectacle comme exemple
    raison: "Une adaptation moderne et audacieuse du classique de Molière qui fait salle comble depuis son ouverture. La mise en scène innovante et les performances exceptionnelles des acteurs ont conquis public et critiques.",
    dateDebut: "2025-10-01",
    dateFin: "2025-11-30",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Exemple
    critiques: [
        {
            id: "1",
            source: "Le Monde",
            auteur: "Marie Dupont",
            extrait: "Une mise en scène brillante qui redonne vie à ce classique. Les acteurs sont exceptionnels et le public est conquis.",
            note: 5,
            lien: "https://lemonde.fr"
        },
        {
            id: "2",
            source: "Télérama",
            auteur: "Jean Martin",
            extrait: "Un spectacle inoubliable qui mêle tradition et modernité avec brio. À voir absolument !",
            note: 4,
            lien: "https://telerama.fr"
        },
        {
            id: "3",
            source: "Les Inrockuptibles",
            auteur: "Sophie Bernard",
            extrait: "Une interprétation magistrale qui renouvelle totalement notre regard sur l'œuvre de Molière.",
            note: 5,
            lien: "https://lesinrocks.com"
        }
    ]
}

// Fonction pour récupérer le pestacle du moment
export async function getPestacleSpotlight(): Promise<PestacleSpotlight> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(pestacleSpotlight), 100)
    })
}