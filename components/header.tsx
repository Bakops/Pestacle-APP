import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">THÉÂTRE+</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/spectacles" className="text-sm font-medium hover:text-accent transition-colors">
              Spectacles
            </Link>
            <Link href="/salles" className="text-sm font-medium hover:text-accent transition-colors">
              Salles
            </Link>
          </nav>
        </div>

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

          <div className="hidden md:block h-6 w-px bg-primary-foreground/20" />

          <Button
            variant="ghost"
            className="hidden md:inline-flex text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-medium"
          >
            FR
          </Button>
        </div>
      </div>
    </header>
  )
}
