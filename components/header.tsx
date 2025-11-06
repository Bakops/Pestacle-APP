"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { SearchModal } from "./SearchModal"
import { MobileMenu } from "./mobile-menu"
import { UserMenu } from "./user-menu"

export function Header() {
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
                <div className="container mx-auto flex h-14 items-center justify-between px-6">
                    <div className="flex items-center gap-8">
                        <MobileMenu />

                        <Link href="/" className="flex items-center">
                            <img src="/LOGO_PESTACLE.png" className="w-[8rem]" alt="Logo Pestacle" />
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/spectacles" className="text-sm font-medium hover:text-accent transition-colors">
                                Spectacles
                            </Link>
                            <Link href="/salles" className="text-sm font-medium hover:text-accent transition-colors">
                                Salles
                            </Link>
                            <Link href="/pestacle-du-moment" className="text-sm font-medium hover:text-accent transition-colors">
                                Pestacle du moment
                            </Link>
                            <Link href="/promo" className="text-sm font-medium hover:text-accent transition-colors">
                                Promo
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Remplacé par UserMenu */}
                        <UserMenu />

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
            <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    )
}