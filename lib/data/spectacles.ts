export interface Spectacle {
    id: string
    titre: string
    description: string
    date: string
    heure: string
    prix: number
    categorie: string
    lieu: string
    duree: string
    artistes: string[]
    image: string
    galerie: string[]
    avis: Avis[]
}

export interface Avis {
    id: string
    auteur: string
    note: number
    commentaire: string
    date: string
}

// Données d'exemple (à remplacer par ton API plus tard)
export const spectaclesData: Spectacle[] = [
    {
        id: "1",
        titre: "Le Malade Imaginaire",
        description: "Une comédie-ballet de Molière mettant en scène Argan, un hypocondriaque obsédé par la médecine. Entre satire médicale et farce familiale, cette pièce intemporelle nous fait rire des travers humains.",
        date: "2025-11-15",
        heure: "20:00",
        prix: 35,
        categorie: "Comédie",
        lieu: "Théâtre de la Ville",
        duree: "2h30",
        artistes: ["Jean Dupont", "Marie Martin", "Pierre Durand"],
        image: "/malade-imaginaire.jpg",
        galerie: [
            "/malade1.jpg",
            "malade2.jpg",
            "/malade3jpg",
            "/malade.jpg"
        ],
        avis: [
            {
                id: "1",
                auteur: "Sophie L.",
                note: 5,
                commentaire: "Spectacle magnifique ! Les acteurs sont exceptionnels.",
                date: "2025-10-20"
            },
            {
                id: "2",
                auteur: "Marc B.",
                note: 4,
                commentaire: "Très bonne mise en scène, décors superbes.",
                date: "2025-10-18"
            }
        ]
    },
    {
        id: "2",
        titre: "Hamlet",
        description: "La célèbre tragédie de Shakespeare où le prince Hamlet cherche à venger la mort de son père. Un chef-d'œuvre intemporel sur la vengeance, la folie et le destin.",
        date: "2025-11-20",
        heure: "19:30",
        prix: 42,
        categorie: "Tragédie",
        lieu: "Comédie Française",
        duree: "3h00",
        artistes: ["Antoine Bernard", "Claire Fontaine", "Luc Mercier"],
        image: "/Hamlet.jpg",
        galerie: [
            "/hamlet2.jpg",
            "/hamlet3.jpg",
            "/hamlet1.jpg"
        ],
        avis: [
            {
                id: "3",
                auteur: "Julie R.",
                note: 5,
                commentaire: "Interprétation magistrale, j'en ai eu des frissons.",
                date: "2025-10-25"
            }
        ]
    },
    {
        id: "3",
        titre: "La Flûte Enchantée",
        description: "L'opéra féerique de Mozart qui raconte le voyage initiatique du prince Tamino pour sauver Pamina. Une œuvre remplie de magie, d'amour et de mystères.",
        date: "2025-12-05",
        heure: "20:30",
        prix: 55,
        categorie: "Opéra",
        lieu: "Opéra Bastille",
        duree: "2h45",
        artistes: ["Elena Rossi", "Thomas Wagner", "Orchestra National"],
        image: "/Fluite-enchante.jpg",
        galerie: [
            "/fluite3.jpg",
            "/fluite1.jpg",
            "/fluite2.jpg",
            "/fluite4.jpg"
        ],
        avis: []
    },
    {
        id: "4",
        titre: "Roméo et Juliette",
        description: "Ballet romantique sur la musique de Prokofiev. L'histoire d'amour tragique des deux jeunes amants de Vérone, racontée à travers la danse.",
        date: "2025-11-25",
        heure: "19:00",
        prix: 48,
        categorie: "Ballet",
        lieu: "Palais Garnier",
        duree: "2h15",
        artistes: ["Compagnie Ballet National", "Orchestre Symphonique"],
        image: "/Romeo-juliette.jpg",
        galerie: [
            "/romeo1.jpg",
            "/romeo2.jpg",
            "/romeo3.jpg",
            "/romeo4.jpg"
        ],
        avis: [
            {
                id: "4",
                auteur: "Paul M.",
                note: 5,
                commentaire: "Chorégraphie époustouflante, les danseurs sont incroyables.",
                date: "2025-10-22"
            }
        ]
    }
]

// Fonction pour récupérer tous les spectacles (simulera un appel API)
export async function getSpectacles(): Promise<Spectacle[]> {
    // Plus tard, tu remplaceras par : const res = await fetch('/api/spectacles')
    return new Promise((resolve) => {
        setTimeout(() => resolve(spectaclesData), 100)
    })
}

// Fonction pour récupérer un spectacle par ID
export async function getSpectacleById(id: string): Promise<Spectacle | undefined> {
    // Plus tard : const res = await fetch(`/api/spectacles/${id}`)
    return new Promise((resolve) => {
        setTimeout(() => resolve(spectaclesData.find(s => s.id === id)), 100)
    })
}

// Fonction pour filtrer les spectacles
export function filterSpectacles(
    spectacles: Spectacle[],
    searchTerm: string,
    categorie?: string,
    date?: string
): Spectacle[] {
    return spectacles.filter(spectacle => {
        const matchSearch = spectacle.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spectacle.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchCategorie = !categorie || categorie === "Toutes" || spectacle.categorie === categorie
        const matchDate = !date || spectacle.date === date

        return matchSearch && matchCategorie && matchDate
    })
}

// Liste des catégories disponibles
export const categories = ["Toutes", "Comédie", "Tragédie", "Opéra", "Ballet", "Drame", "Comédie Musicale"]