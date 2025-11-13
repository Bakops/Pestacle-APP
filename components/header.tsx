"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User, X } from "lucide-react"

const languages = [
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "EN", name: "English", flag: "🇬🇧" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isSearchOpen])

  const handleSearch = () => {
    console.log("Recherche:", searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return ( 
    <>
      <header
        className={`fixed top-0 z-50 w-full text-primary-foreground transition-all duration-300 ${
          isScrolled
            ? "bg-[#000000] shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="bg-[#4ECDC4] text-center text-[12px] py-1 font-semibold text-white">
          🎉 Profitez de 20% de réduction sur votre premier achat avec le code #PESTACLE2026 ! 🎉
        </div>
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          {/* Menu mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:opacity-80 transition"
            >
              ☰
            </button>
          </div>

          {/* DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/spectacle"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full"
            >
              Spectacles
            </Link>
            <Link
              href="/salle"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full"
            >
              Salles
            </Link>
            <Link
              href="/spectacle-du-moment"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full"
            >
              Pestacle du moment
            </Link>
            <Link
              href="/promo"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full"
            >
              Promo
            </Link>
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img
              src="LOGO_PESTACLE.png"
              className="w-32 drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]"
              alt="Logo Pestacle"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground cursor-pointer"
            >
              <User className="h-5 w-5" />
            </Button>

            <Link
              href="/reserver"
              className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md border border-white/10 hover:bg-[#2C2F33] shadow-[#FF6B6B]/30 hover:shadow-lg hover:shadow-[#FF6B6B]/40 transition-all duration-300 cursor-pointer"
            >
              <img src="ticket.webp" className="w-5 h-5 rotate-[-10deg]" />
              <span className="text-[12px]">Réserver</span>
            </Link>

            <div className="hidden md:block h-6 w-px bg-primary-foreground/20" />
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="text-primary-foreground font-medium hover:bg-primary-foreground/10 cursor-pointer flex items-center gap-2"
              >
                <span>{selectedLanguage.code}</span>
                <span>{selectedLanguage.flag}</span>
              </Button>

              {isLanguageOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLanguageOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden w-48 z-50 animate-slide-down">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang)
                          setIsLanguageOpen(false)
                        }}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                          selectedLanguage.code === lang.code
                            ? "bg-[#FF6B6B] text-white"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <div>
                          <p className="font-semibold text-sm">{lang.name}</p>
                          <p className={`text-xs ${selectedLanguage.code === lang.code ? "text-white/70" : "text-gray-500"}`}>
                            {lang.code}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-60 flex items-start justify-center pt-32 px-4 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          
          <div className="relative w-full max-w-3xl animate-slide-up ">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-[#FF6B6B] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Rechercher un spectacle, une salle, un artiste..."
                  className="w-full h-15 pl-16 pr-16 text-lg bg-white rounded-3xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/30 text-gray-900 placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-[#FF6B6B]" />
                </button>
              </div>
            </div>

            <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wide mb-4">
                Recherches populaires
              </p>
              <div className="flex flex-wrap gap-2">
                {["Les Misérables", "Notre-Dame de Paris", "Hamlet", "Pat'Patrouille", "Bulle"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#FF6B6B] hover:text-white text-gray-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-[#0D1821] text-white p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl hover:text-[#FF6B6B] transition"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-xl font-medium tracking-wide">
            <Link href="/spectacles" onClick={() => setIsMobileMenuOpen(false)} className="">
              Spectacles
            </Link>
            <Link href="/salles" onClick={() => setIsMobileMenuOpen(false)}>
              Salles
            </Link>
            <Link href="/pestacle-du-moment" onClick={() => setIsMobileMenuOpen(false)}>
              Pestacle du moment
            </Link>
            <Link href="/promo" onClick={() => setIsMobileMenuOpen(false)}>
              Promo
            </Link>
            <Link
              href="/reserver"
              className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full text-lg mt-4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Réserver
            </Link>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-white/60 mb-3">Langue</p>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-3 rounded-full flex items-center gap-3 transition-all ${
                      selectedLanguage.code === lang.code
                        ? "bg-[#FF6B6B] text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}