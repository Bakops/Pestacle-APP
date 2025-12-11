export type Seance = {
    date: string
    heure: string
    salle: string
    ville: string
    dispo: string
    disponibilite: number
    image: string
}

export const spectacleDuMoment = {
    titre: "Le Roi du Rire",
    artiste: "Jean Dupont",
    image: "/Roi du rie.jpg",
    categorie: "Humour",
    description: "Un one-man-show explosif mêlant stand-up, improvisation et interactions avec le public. Une soirée où chaque représentation est unique et inoubliable.",
    duree: "1h30",
    ageMin: "12+",
    note: "4.8",
    prix: "À partir de 28€",
    tendance: "+45% de réservations cette semaine"
}

export const seances: Seance[] = [
    {
        date: "Sam 24 janvier",
        heure: "20h30",
        salle: "Théâtre des Lumières",
        ville: "Nantes",
        dispo: "Places disponibles",
        disponibilite: 85,
        image: "/salle4.jpeg"
    },
    {
        date: "Dim 25 janvier",
        heure: "18h00",
        salle: "Théâtre des Lumières",
        ville: "Reze",
        dispo: "Places limitées",
        disponibilite: 15,
        image: "/salle 3.JPG"
    },
    {
        date: "Ven 30 janvier",
        heure: "21h00",
        salle: "Théâtre Nova",
        ville: "Saint Herblain",
        dispo: "Ouverture prochaine",
        disponibilite: 100,
        image: "/salle 2.PNG"
    },
    {
        date: "Sam 31 janvier",
        heure: "19h30",
        salle: "Salle Principale",
        ville: "Nantes",
        dispo: "Places disponibles",
        disponibilite: 70,
        image: "/salle 1.JPG"
    },
]

export const spectaclesAssocies = [
    {
        id: 1,
        titre: "La Comédie Musicale",
        artiste: "Marie Laurent",
        categorie: "Comédie musicale",
        image: "/comedi musical.JPG",
        note: "4.6",
        prix: "32€"
    },
    {
        id: 2,
        titre: "Théâtre Classique",
        artiste: "Pierre Moreau",
        categorie: "Théâtre",
        image: "theatre.jpg",
        note: "4.7",
        prix: "25€"
    },
    {
        id: 3,
        titre: "Stand-Up Night",
        artiste: " Merwane Benlazar",
        categorie: "Humour",
        image: "/standup Benlazar.jpg",
        note: "4.5",
        prix: "28€"
    },
]
