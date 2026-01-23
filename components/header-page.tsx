"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User, X, LogOut } from "lucide-react"
import { CartButton } from "./CartButton"
import { useUser } from '@auth0/nextjs-auth0/client'
import { getSpectacles } from "@/lib/api"
import { Spectacle } from "@/lib/types"


export function HeaderPage() {
    const { user, isLoading } = useUser()
   
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isLanguageOpen, setIsLanguageOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Spectacle[]>([])
    const [allSpectacles, setAllSpectacles] = useState<Spectacle[]>([])
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)



    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isSearchOpen])

    useEffect(() => {
        const fetchAllSpectacles = async () => {
            try {
                const spectacles = await getSpectacles()
                setAllSpectacles(spectacles)
            } catch (error) {
                console.error("Erreur lors du chargement des spectacles:", error)
            }
        }
        fetchAllSpectacles()
    }, [])

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = allSpectacles.filter((spectacle) =>
                spectacle.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (spectacle.description && spectacle.description.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            setSearchResults(filtered.slice(0, 8))
        } else {
            setSearchResults([])
        }
    }, [searchQuery, allSpectacles])

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
                className={`fixed top-0 z-50 w-full bg-black text-primary-foreground transition-all duration-300`}
            >
                <div className="bg-[#4ECDC4] text-center text-[12px] py-1 font-semibold text-white">
                    🎉 Profitez de 20% de réduction sur votre premier achat avec le code #PESTACLE2026 ! 🎉
                </div>
                <div className="container mx-auto flex h-14 items-center justify-between px-6">
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="text-white hover:opacity-80 transition"
                        >
                            ☰
                        </button>
                    </div>

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
                            src="/LOGO_PESTACLE.png"
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

                        <CartButton />

                        {/* User Menu */}
                        {!isLoading && (
                            <div className="relative">
                                {user ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground cursor-pointer"
                                        >
                                            {user.picture ? (
                                                <img
                                                    src={user.picture}
                                                    alt={user.name || "User"}
                                                    className="h-8 w-8 rounded-full"
                                                />
                                            ) : (
                                                <User className="h-5 w-5" />
                                            )}
                                        </Button>

                                        {isUserMenuOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                />
                                                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden w-64 z-50 animate-slide-down">
                                                    <div className="p-4 border-b border-gray-100">
                                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                    <div className="p-2">
                                                        <Link
                                                            href="/profile"
                                                            className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                        >
                                                            Mon profil
                                                        </Link>
                                                        <Link
                                                            href="/mes-reservations"
                                                            className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                        >
                                                            Mes réservations
                                                        </Link>
                                                        <a
                                                            href="/auth/logout"
                                                            className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <LogOut className="h-4 w-4" />
                                                            Déconnexion
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <Link href="/auth/login">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground cursor-pointer"
                                        >
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}

                        <Link
                            href="/reserver"
                            className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md border border-white/10 hover:bg-[#2C2F33] shadow-[#FF6B6B]/30 hover:shadow-lg hover:shadow-[#FF6B6B]/40 transition-all duration-300 cursor-pointer"
                        >
                            <img src="/ticket.webp" className="w-5 h-5 rotate-[-10deg]" />
                            <span className="text-[12px]">Réserver</span>
                        </Link>
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
                            {searchResults.length > 0 ? (
                                <div>
                                    <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wide mb-4">
                                        Résultats ({searchResults.length})
                                    </p>
                                    <div className="space-y-2">
                                        {searchResults.map((spectacle) => (
                                            <Link
                                                key={spectacle.id}
                                                href={`/spectacle/${spectacle.id}`}
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                <div className="p-4 bg-gray-50 hover:bg-[#4ECDC4] hover:text-white rounded-lg transition-all duration-300 cursor-pointer group">
                                                    <p className="font-semibold text-gray-900 group-hover:text-white mb-1">{spectacle.titre}</p>
                                                    <p className="text-sm text-gray-600 group-hover:text-white/80 line-clamp-1">{spectacle.description || 'Aucune description'}</p>
                                                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500 group-hover:text-white/70">
                                                        <span>{spectacle.lieu || 'Lieu à définir'}</span>
                                                        <span className="font-bold text-[#4ECDC4] group-hover:text-white">{spectacle.prixUnitaire}€</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : searchQuery.trim() ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 font-medium">Aucun spectacle trouvé pour "<span className="text-[#FF6B6B]">{searchQuery}</span>"</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wide mb-4">
                                        Recherches populaires
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Les Misérables", "Notre-Dame de Paris", "Hamlet", "Pat'Patrouille", "Spectacle"].map((suggestion) => (
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
                            )}
                        </div>
                    </div>
                </div>
            )}

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
                        <Link href="/spectacles" onClick={() => setIsMobileMenuOpen(false)}>
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

                        {user ? (
                            <>
                                <div className="border-t border-white/20 pt-6 mt-4">
                                    <p className="text-sm text-white/60 mb-3">Connecté en tant que</p>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-white/70">{user.email}</p>
                                </div>
                                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                    Mon profil
                                </Link>
                                <a
                                    href="/api/auth/logout"
                                    className="bg-red-500 text-white px-4 py-2 rounded-full text-lg text-center"
                                >
                                    Déconnexion
                                </a>
                            </>
                        ) : (
                            <Link
                                href="/api/auth/login"
                                className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full text-lg mt-4 text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Se connecter
                            </Link>
                        )}

                        
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