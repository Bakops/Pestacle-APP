"use client";

import { Button } from "@/components/ui/button"

const movies = [
  {
    id: 1,
    title: "Les Misérables",
    price: "À partir de 25€",
    image: "/les-miserables-musical-theater.jpg",
    badge: "Nouveauté",
  },
  {
    id: 2,
    title: "Jeux et Lumière à la Cathédrale",
    price: "À partir de 20€",
    image: "/Catedrale.png",
    badge: "Populaire",
  },
  {
    id: 3,
    title: "Hamlet",
    price: "À partir de 30€",
    image: "/hamlet-shakespeare-theater.jpg",
  },
  {
    id: 4,
    title: "Chicago",
    price: "À partir de 52€",
    image: "/chicago-musical-theater-jazz.jpg",
  },


]

export default function PestacleExplorerSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-block bg-[#FF6B6B]/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#FF6B6B]">
              Pestacle chez vous
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Prolongez l'expérience Pestacle chez vous
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Découvrez nos spectacles exclusifs disponibles en streaming, avec plus de 100 spectacles disponibles à la location ou à l'achat.
          </p>
        </div>

        <div className="relative mb-12 flex items-center justify-center">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max px-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative shrink-0 w-64 cursor-pointer"
                >
                  <div className="relative aspect-2/3 overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {movie.badge && (
                      <div className="absolute top-4 right-4 bg-[#FF6B6B] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-20">
                        {movie.badge}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* BOUTON PLAY */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 bg-[#FF6B6B] backdrop-blur-sm rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-white border-b-8 border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-800">
                      {movie.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#FF6B6B] hover:bg-black hover:text-white text-white border font-medium h-12 px-8 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Découvrir tous les spectacles
        </Button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .border-l-12 {
          border-left-width: 12px;
        }
      `}</style>
    </section>
  )
}