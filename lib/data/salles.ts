export interface Salle {
    id: string
    nom: string
    adresse: string
    ville: string
    codePostal: string
    capacite: number
    description: string
    photo: string
    galerie: string[]
    equipements: string[]
    siteWeb?: string
    telephone?: string
    email?: string
    coordonnees: {
        lat: number
        lng: number
    }
    spectaclesIds: string[] // IDs des spectacles programmés
}

// Données d'exemple
export const sallesData: Salle[] = [
    {
        id: "1",
        nom: "Théâtre de la Ville",
        adresse: "2 Place du Châtelet",
        ville: "Paris",
        codePostal: "75004",
        capacite: 960,
        description: "Salle mythique située au cœur de Paris, le Théâtre de la Ville propose une programmation éclectique mêlant théâtre contemporain, danse et musique. Architecture moderne avec une acoustique exceptionnelle.",
        photo: "salle.jpg",
        galerie: [
            "/salle1.jpg",
            "/salle2.jpg",
            "/salle3.jpg"
        ],
        equipements: [
            "Parking à proximité",
            "Accessibilité PMR",
            "Bar",
            "Vestiaire",
            "Climatisation"
        ],
        siteWeb: "https://theatredelaville-paris.com",
        telephone: "+33 1 42 74 22 77",
        email: "contact@theatredelaville.com",
        coordonnees: {
            lat: 48.8580,
            lng: 2.3470
        },
        spectaclesIds: ["1", "2"]
    },
    {
        id: "2",
        nom: "Comédie Française",
        adresse: "1 Place Colette",
        ville: "Paris",
        codePostal: "75001",
        capacite: 862,
        description: "Institution théâtrale française fondée en 1680, la Comédie-Française est le plus ancien théâtre national au monde encore en activité. Répertoire classique et créations contemporaines.",
        photo: "/salle4.jpg",
        galerie: [
            "/salle5.jpg",
            "/salle6.jpg"
        ],
        equipements: [
            "Accessibilité PMR",
            "Bar",
            "Vestiaire",
            "Boutique",
            "Restaurant"
        ],
        siteWeb: "https://comedie-francaise.fr",
        telephone: "+33 1 44 58 15 15",
        email: "info@comedie-francaise.fr",
        coordonnees: {
            lat: 48.8634,
            lng: 2.3356
        },
        spectaclesIds: ["2"]
    },
    {
        id: "3",
        nom: "Opéra Bastille",
        adresse: "Place de la Bastille",
        ville: "Paris",
        codePostal: "75012",
        capacite: 2745,
        description: "Salle d'opéra moderne inaugurée en 1989, l'Opéra Bastille est dédiée principalement à l'art lyrique. Architecture contemporaine avec une scène parmi les plus grandes et équipées d'Europe.",
        photo: "/salle7.jpg",
        galerie: [
            "/salle8.jpg",
            "/salle9.jpg",
            "/salle13.jpg"
        ],
        equipements: [
            "Parking",
            "Accessibilité PMR",
            "Plusieurs bars",
            "Vestiaire",
            "Boutique",
            "Visites guidées"
        ],
        siteWeb: "https://operadeparis.fr",
        telephone: "+33 1 72 29 35 35",
        email: "contact@operadeparis.fr",
        coordonnees: {
            lat: 48.8530,
            lng: 2.3694
        },
        spectaclesIds: ["3"]
    },
    {
        id: "4",
        nom: "Palais Garnier",
        adresse: "Place de l'Opéra",
        ville: "Paris",
        codePostal: "75009",
        capacite: 1979,
        description: "Chef-d'œuvre architectural du Second Empire, le Palais Garnier est l'une des plus belles salles d'opéra au monde. Décors somptueux, plafond peint par Chagall et acoustique remarquable.",
        photo: "/salle10.jpg",
        galerie: [
            "/salle14.jpg"
        ],
        equipements: [
            "Accessibilité PMR",
            "Bar",
            "Vestiaire",
            "Boutique",
            "Musée",
            "Visites guidées"
        ],
        siteWeb: "https://operadeparis.fr",
        telephone: "+33 1 71 25 24 23",
        email: "contact@operadeparis.fr",
        coordonnees: {
            lat: 48.8720,
            lng: 2.3318
        },
        spectaclesIds: ["4"]
    },
    {
        id: "5",
        nom: "Théâtre du Châtelet",
        adresse: "1 Place du Châtelet",
        ville: "Paris",
        codePostal: "75001",
        capacite: 2010,
        description: "Salle à l'italienne inaugurée en 1862, rénovée en 2019. Programmation variée : opéras, comédies musicales, concerts et ballets. Architecture néo-baroque magnifiquement restaurée.",
        photo: "/salle11.jpg",
        galerie: [
            "/salle12.jpg"
        ],
        equipements: [
            "Parking à proximité",
            "Accessibilité PMR",
            "Bar",
            "Vestiaire",
            "Boutique"
        ],
        siteWeb: "https://chatelet.com",
        telephone: "+33 1 40 28 28 40",
        email: "info@chatelet.com",
        coordonnees: {
            lat: 48.8576,
            lng: 2.3472
        },
        spectaclesIds: []
    }
]

// Fonction pour récupérer toutes les salles
export async function getSalles(): Promise<Salle[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(sallesData), 100)
    })
}

// Fonction pour récupérer une salle par ID
export async function getSalleById(id: string): Promise<Salle | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(sallesData.find(s => s.id === id)), 100)
    })
}

// Fonction pour filtrer les salles
export function filterSalles(
    salles: Salle[],
    searchTerm: string,
    ville?: string,
    capaciteMin?: number
): Salle[] {
    return salles.filter(salle => {
        const matchSearch =
            salle.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.adresse.toLowerCase().includes(searchTerm.toLowerCase())

        const matchVille = !ville || ville === "Toutes" || salle.ville === ville
        const matchCapacite = !capaciteMin || salle.capacite >= capaciteMin

        return matchSearch && matchVille && matchCapacite
    })
}

// Liste des villes disponibles
export const villes = ["Toutes", "Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse"]

// Options de capacité pour le filtre
export const capaciteOptions = [
    { label: "Toutes capacités", value: 0 },
    { label: "Moins de 500 places", value: 0 },
    { label: "500 à 1000 places", value: 500 },
    { label: "1000 à 2000 places", value: 1000 },
    { label: "Plus de 2000 places", value: 2000 }
]