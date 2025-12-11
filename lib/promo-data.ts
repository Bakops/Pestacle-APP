// lib/promo-data.ts ou data/promotions.ts

export interface Promotion {
    id: number;
    title: string;
    image: string;
    discount: string;
    description: string;
    code: string;
    validUntil: string;
    category: string;
    originalPrice?: number;
    discountedPrice?: number;
}

export const promotions: Promotion[] = [
    {
        id: 1,
        title: "Les Misérables - Édition Spéciale",
        image: "/image-spectale1.jpg",
        discount: "-30%",
        description: "Profitez d'une réduction exceptionnelle sur le chef-d'œuvre de Victor Hugo. Une adaptation musicale grandiose qui vous transportera dans le Paris du XIXe siècle.",
        code: "MISERABLES30",
        validUntil: "31 Mars 2025",
        category: "Comédie Musicale",
        originalPrice: 65,
        discountedPrice: 45.50
    },
    {
        id: 2,
        title: "Notre-Dame de Paris",
        image: "/image-spectale2.jpg",
        discount: "-25%",
        description: "Revivez l'histoire d'amour tragique de Quasimodo et Esmeralda avec cette offre limitée. Spectacle musical à couper le souffle.",
        code: "NOTREDAME25",
        validUntil: "15 Avril 2025",
        category: "Comédie Musicale",
        originalPrice: 70,
        discountedPrice: 52.50
    },
    {
        id: 3,
        title: "Hamlet - Version Contemporaine",
        image: "/image-spectale3.jpg",
        discount: "-40%",
        description: "Découvrez une interprétation moderne et audacieuse du classique de Shakespeare. Une mise en scène innovante qui revisite le chef-d'œuvre.",
        code: "HAMLET40",
        validUntil: "28 Février 2025",
        category: "Théâtre Classique",
        originalPrice: 55,
        discountedPrice: 33
    },
    {
        id: 4,
        title: "Winnie",
        image: "/image-spectale4.jpg",
        discount: "-20%",
        description: "Vos enfants vont adorer ! Offre familiale spéciale pour découvrir les aventures de la Pat'Patrouille sur scène. Spectacle interactif.",
        code: "Winenie20",
        validUntil: "30 Juin 2025",
        category: "Spectacle Enfant",
        originalPrice: 45,
        discountedPrice: 36
    },
    {
        id: 5,
        title: "Bulle - Spectacle de Cirque",
        image: "/image-spectale1.jpg",
        discount: "-35%",
        description: "Un spectacle de cirque contemporain époustouflant qui mêle acrobaties, humour et poésie. Une expérience unique pour toute la famille.",
        code: "BULLE35",
        validUntil: "20 Mai 2025",
        category: "Cirque Moderne",
        originalPrice: 60,
        discountedPrice: 39
    },
    {
        id: 6,
        title: "Le Fantôme de l'Opéra",
        image: "/image-spectale2.jpg",
        discount: "-15%",
        description: "Le mystère et la romance s'unissent dans cette production légendaire. Une mise en scène somptueuse avec des décors à couper le souffle.",
        code: "FANTOME15",
        validUntil: "31 Décembre 2025",
        category: "Comédie Musicale",
        originalPrice: 80,
        discountedPrice: 68
    }
];