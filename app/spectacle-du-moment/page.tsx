"use client"

import { Headerpage } from "@/components/header-page"
import { useState } from "react"

type Seance = {
    date: string
    heure: string
    salle: string
    ville: string
    dispo: string
    disponibilite: number
    image: string
}
import { Calendar, MapPin, Clock, Users, Star, Heart, Share2, Ticket, ChevronRight, TrendingUp } from "lucide-react"


const spectacleDuMoment = {
    titre: "Le Roi du Rire",
    artiste: "Jean Dupont",
    image: "/Roi lion.jpg",
    categorie: "Humour",
    description: "Un one-man-show explosif mêlant stand-up, improvisation et interactions avec le public. Une soirée où chaque représentation est unique et inoubliable.",
    duree: "1h30",
    ageMin: "12+",
    note: "4.8",
    prix: "À partir de 28€",
    tendance: "+45% de réservations cette semaine"
}

const seances: Seance[] = [
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

const spectaclesAssocies = [
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

export default function SpectacleDuMomentPage() {
    const [isFavorite, setIsFavorite] = useState(false)
    const [selectedSeance, setSelectedSeance] = useState<Seance | null>(null)
    const [selectedSpectacleForDates, setSelectedSpectacleForDates] = useState<any>(null)
    const [isDatesOpen, setIsDatesOpen] = useState(false)

    const openDates = (spectacle: any) => {
        setSelectedSpectacleForDates(spectacle)
        setIsDatesOpen(true)
    }

    const closeDates = () => {
        setSelectedSpectacleForDates(null)
        setIsDatesOpen(false)
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Headerpage />

            <main className="flex-1">
                {/* Hero Section - Style identique à votre code */}
                <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Spectacle du moment
              </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Spectacle du moment
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl">
                            Découvrez le spectacle du moment organisé au sein de nos salles.
                        </p>
                    </div>
                </div>

                {/* Section Spectacle Featured */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0">
                                {/* Image principale */}
                                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden group">
                                    <img
                                        src={spectacleDuMoment.image}
                                        alt={spectacleDuMoment.titre}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Badge trending */}
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-gradient-to-r from-[#4ECDC4] to-[#5218CC] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4" />
                                            En tendance
                                        </div>
                                    </div>

                                    {/* Note en overlay */}
                                    <div className="absolute top-6 right-6">
                                        <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                                            <Star className="w-4 h-4 fill-[#FFB347] text-[#FFB347]" />
                                            {spectacleDuMoment.note}/5
                                        </div>
                                    </div>

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Contenu */}
                                <div className="p-8 lg:p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#4ECDC4]/10 text-[#4ECDC4] px-4 py-1.5 rounded-full text-sm font-semibold">
                        {spectacleDuMoment.categorie}
                      </span>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                                                {spectacleDuMoment.duree}
                      </span>
                                        </div>

                                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                            {spectacleDuMoment.titre}
                                        </h2>

                                        <p className="text-lg text-[#4ECDC4] font-semibold mb-4">
                                            avec {spectacleDuMoment.artiste}
                                        </p>

                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {spectacleDuMoment.description}
                                        </p>

                                        {/* Stats badge */}
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4ECDC4]/10 to-[#5218CC]/10 border border-[#4ECDC4]/30 px-4 py-2.5 rounded-full mb-6">
                                            <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
                                            <span className="text-sm font-semibold text-gray-900">
                        {spectacleDuMoment.tendance}
                      </span>
                                        </div>

                                        {/* Infos pratiques */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-gray-50 rounded-2xl p-4">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Âge minimum</p>
                                                <p className="text-xl font-bold text-gray-900">{spectacleDuMoment.ageMin}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-4">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">À partir de</p>
                                                <p className="text-xl font-bold text-gray-900">{spectacleDuMoment.prix}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <button className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#5218CC] hover:from-[#5218CC] hover:to-[#4ECDC4] text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                            <Ticket className="w-5 h-5" />
                                            Réserver maintenant
                                        </button>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setIsFavorite(!isFavorite)}
                                                className={`flex-1 ${isFavorite ? 'bg-[#FF6B6B] text-white' : 'bg-white border-2 border-gray-200 text-gray-800'} hover:bg-[#FF6B6B] hover:text-white hover:border-[#FF6B6B] font-medium py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2`}
                                            >
                                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                                                Favoris
                                            </button>
                                            <button className="flex-1 bg-white border-2 border-gray-200 text-gray-800 hover:border-[#4ECDC4] hover:text-[#4ECDC4] font-medium py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                                                <Share2 className="w-5 h-5" />
                                                Partager
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modal Voir les dates */}
                {isDatesOpen && selectedSpectacleForDates && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50" onClick={closeDates} />
                        <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-4 p-6 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">Dates — {selectedSpectacleForDates.titre}</h3>
                                <button onClick={closeDates} className="text-gray-500">Fermer</button>
                            </div>

                            <div className="grid gap-4">
                                {seances.map((d, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="font-semibold">{d.date} — {d.heure}</p>
                                            <p className="text-sm text-gray-500">{d.salle} • {d.ville}</p>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedSeance(d); closeDates(); }}
                                            className="bg-[#4ECDC4] text-white px-4 py-2 rounded-full"
                                        >
                                            Réserver
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Prochaines séances */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Prochaines séances
                            </h2>
                            <p className="text-lg text-gray-600">
                                Choisissez la date et la salle qui vous conviennent le mieux
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {seances.map((seance, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSeance(seance)}
                                    className={`bg-white border-2 ${selectedSeance === seance ? 'border-[#4ECDC4] shadow-2xl' : 'border-gray-200'} rounded-3xl overflow-hidden hover:border-[#4ECDC4] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left group`}
                                >
                                    {/* Image de la salle */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={seance.image}
                                            alt={seance.salle}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <p className="text-white font-semibold text-sm">{seance.salle}</p>
                                            <p className="text-white/80 text-xs">{seance.ville}</p>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-baseline gap-3 mb-4">
                                            <p className="text-2xl font-bold text-gray-900">{seance.heure}</p>
                                            <p className="text-sm text-gray-500">{seance.date}</p>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                {spectacleDuMoment.duree}
                                            </div>
                                            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                                                seance.dispo === "Places limitées"
                                                    ? "bg-[#FFB347] text-gray-900"
                                                    : seance.dispo === "Ouverture prochaine"
                                                        ? "bg-gray-200 text-gray-700"
                                                        : "bg-[#4ECDC4] text-white"
                                            }`}>
                        {seance.dispo}
                      </span>
                                        </div>

                                        {/* Barre de disponibilité */}
                                        <div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        seance.disponibilite > 50 ? 'bg-[#4ECDC4]' :
                                                            seance.disponibilite > 20 ? 'bg-[#FFB347]' : 'bg-[#FF6B6B]'
                                                    }`}
                                                    style={{ width: `${seance.disponibilite}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">{seance.disponibilite}% disponible</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section Spectacles similaires */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Vous aimerez aussi
                            </h2>
                            <p className="text-lg text-gray-600">
                                Découvrez d&apos;autres spectacles qui pourraient vous plaire
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {spectaclesAssocies.map((spectacle) => (
                                <div
                                    key={spectacle.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={spectacle.image}
                                            alt={spectacle.titre}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Badges overlay */}
                                        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        {spectacle.categorie}
                      </span>
                                            <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFB347] text-[#FFB347]" />
                                                {spectacle.note}
                      </span>
                                        </div>

                                        {/* Prix en bas */}
                                        <div className="absolute bottom-4 left-4">
                      <span className="bg-[#4ECDC4] text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                        {spectacle.prix}
                      </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#4ECDC4] transition-colors">
                                            {spectacle.titre}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">avec {spectacle.artiste}</p>
                                        <button onClick={() => openDates(spectacle)} className="text-[#4ECDC4] hover:text-[#5218CC] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Voir les dates
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}