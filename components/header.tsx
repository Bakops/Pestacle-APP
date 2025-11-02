"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full text-primary-foreground transition-all duration-300 ${
          isScrolled
            ? "bg-[#000000] shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="bg-[#6320EE] text-center text-[12px] py-1 font-semibold text-white">
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

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/spectacles"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full"
            >
              Spectacles
            </Link>
            <Link
              href="/salles"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full"
            >
              Salles
            </Link>
            <Link
              href="/pestacle-du-moment"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full"
            >
              Pestacle du moment
            </Link>
            <Link
              href="/promo"
              className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full"
            >
              Promo
            </Link>
          </nav>

          {/* Logo centré */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img
              src="LOGO_PESTACLE.png"
              className="w-[8rem] drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]"
              alt="Logo Pestacle"
            />
          </Link>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <User className="h-5 w-5" />
            </Button>

            <Link
              href="/reserver"
              className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md border border-white/10 hover:bg-[#2C2F33] transition shadow-[#6320EE]/30 hover:shadow-lg hover:shadow-[#6320EE]/40 transition-all duration-300 "
            >
              <img src="ticket.webp" className="w-5 h-5 rotate-[-10deg]" />
              <span className="text-[12px]">Réserver</span>
            </Link>

            <div className="hidden md:block h-6 w-px bg-primary-foreground/20" />

            <Button
              variant="ghost"
              className="hidden md:inline-flex text-primary-foreground font-medium hover:bg-primary-foreground/10"
            >
              FR
            </Button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0D1821] text-white p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl hover:text-[#6320EE] transition"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-lg uppercase tracking-wide">
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
            <Link
              href="/reserver"
              className="bg-white text-black px-4 py-2 rounded-md mt-4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}