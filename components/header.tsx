import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"

export function Header() {

  
  return (
    <>
      <div className="bg-[#6320EE] text-center text-[12px] py-1 font-semibold text-white">
        🎉 Profitez de 20% de réduction sur votre premier achat avec le code #PESTACLE2026 ! 🎉
      </div>

      <header className="sticky top-0 z-50 w-full bg-[#000000] text-primary-foreground shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <div className="md:hidden">
            <button id="mobile-menu-btn" className="text-white hover:opacity-80 transition">
              ☰
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/spectacles" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full">
              Spectacles
            </Link>
            <Link href="/salles" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full">
              Salles
            </Link>
            <Link href="/pestacle-du-moment" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full">
              Pestacle du moment
            </Link>
            <Link href="/promo" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-[#6320EE] after:transition-all after:duration-300 hover:after:w-full">
              Promo
            </Link>
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img
              src="LOGO_PESTACLE.png"
              className="w-[8rem] drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]"
              alt="Logo Pestacle"
            />
          </Link>

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
              className="hidden md:flex items-center gap-2 bg-[#2C2F33] px-3 py-1 rounded-md border border-white/10 hover:bg-white/10 transition"
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

      <div id="mobile-menu" className="fixed top-0 left-0 w-full h-full bg-[#0D1821] text-white p-6 hidden">
        <div className="flex justify-end mb-6">
          <button id="mobile-menu-close" className="text-3xl">×</button>
        </div>

        <nav className="flex flex-col gap-6 text-lg uppercase tracking-wide">
          <Link href="/spectacles">Spectacles</Link>
          <Link href="/salles">Salles</Link>
          <Link href="/pestacle-du-moment">Pestacle du moment</Link>
          <Link href="/promo">Promo</Link>
          <Link href="/reserver" className="bg-white text-black px-4 py-2 rounded-md mt-4 text-center">Réserver</Link>
        </nav>
      </div>
    </>
  )
}
