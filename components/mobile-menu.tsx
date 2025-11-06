"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Home, Theater, Building2, Star, Tag } from "lucide-react"

export function MobileMenu() {
    const [open, setOpen] = useState(false)

    const menuItems = [
        { href: "/", label: "Accueil", icon: Home },
        { href: "/spectacles", label: "Spectacles", icon: Theater },
        { href: "/salles", label: "Salles", icon: Building2 },
        { href: "/pestacle-du-moment", label: "Pestacle du moment", icon: Star },
        { href: "/promo", label: "Promo", icon: Tag },
    ]

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle className="text-left">
                        <img src="/LOGO_PESTACLE.png" className="w-[6rem]" alt="Logo Pestacle" />
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                            >
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className="absolute bottom-8 left-6 right-6">
                    <div className="border-t pt-6">
                        <Button variant="outline" className="w-full mb-3">
                            Connexion
                        </Button>
                        <Button className="w-full">
                            Inscription
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}