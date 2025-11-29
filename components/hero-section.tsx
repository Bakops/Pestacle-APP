"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

import heroSlides from "@/data/hero-sections-data"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section className="z-30 relative h-screen min-h-[600px] overflow-hidden bg-black shadow-md">
      <div className="absolute inset-0">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 h-full flex items-center pb-20">
        <div className="max-w-2xl">
          <div
            key={`badge-${slide.id}`}
            className="inline-block bg-[#FF6B6B] px-4 py-1.5 rounded-full mb-4 animate-fade-in"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-white">
              {slide.badge}
            </span>
          </div>

          <h1
            key={`title-${slide.id}`}
            className="text-5xl md:text-7xl font-bold  text-white mb-4 leading-tight animate-fade-in-up"
          >
            {slide.title}
          </h1>

          <p
            key={`desc-${slide.id}`}
            className="text-lg text-white/90 mb-8 leading-relaxed animate-fade-in-up animation-delay-200"
          >
            {slide.description}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              className="bg-[#FF6B6B] hover:bg-[#4ECDC4] text-white font-medium px-10 h-11 rounded-full shadow-lg shadow-[#4ECDC4]/30 hover:shadow-xl hover:shadow-[#4ECDC4]/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Réserver
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 hover:bg-white/15 text-white border hover:text-white border-white/20 hover:border-white/40 backdrop-blur-md font-medium px-10 h-11 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Play className="h-4 w-4 mr-2" />
              Bande-annonce
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all cursor-pointer ${
              index === currentSlide
                ? "w-8 bg-[#FF6B6B]"
                : "w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  )
}