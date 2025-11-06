
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogIn, UserPlus, Settings, Heart, Calendar, LogOut, Ticket, Shield } from "lucide-react"
import type { User as UserType } from "@/lib/data/auth"
import { isAdmin } from "@/lib/data/auth"

interface UserMenuProps {
    user?: UserType | null
}

export function UserMenu({ user = null }: UserMenuProps) {
    const [currentUser, setCurrentUser] = useState<UserType | null>(user)

    const handleLogout = () => {
        setCurrentUser(null)
        console.log("Déconnexion")
    }

    if (!currentUser) {
        // Menu pour utilisateur non connecté
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                        <User className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/connexion" className="cursor-pointer">
                            <LogIn className="mr-2 h-4 w-4" />
                            <span>Connexion</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/inscription" className="cursor-pointer">
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Inscription</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/spectacles" className="cursor-pointer">
                            <Ticket className="mr-2 h-4 w-4" />
                            <span>Parcourir les spectacles</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    const userIsAdmin = isAdmin(currentUser)

    // Menu pour utilisateur connecté
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground relative"
                >
                    <User className="h-5 w-5" />
                    <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-primary ${
                        userIsAdmin ? 'bg-destructive' : 'bg-accent'
                    }`} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {currentUser.prenom} {currentUser.nom}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {currentUser.email}
                        </p>
                        {userIsAdmin && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-destructive mt-1">
                <Shield className="h-3 w-3" />
                Administrateur
              </span>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {userIsAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer font-semibold text-destructive">
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Espace Admin</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuItem asChild>
                    <Link href="/profil" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Mon profil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/mes-reservations" className="cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Mes réservations</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/favoris" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Mes favoris</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/parametres" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}