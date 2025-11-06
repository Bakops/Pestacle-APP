"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Ici tu pourras ajouter ta logique de recherche
        console.log("Recherche pour:", searchQuery)
        // Tu peux rediriger vers /spectacles avec un paramètre de recherche
        // window.location.href = `/spectacles?search=${searchQuery}`
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Rechercher un spectacle</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Rechercher un spectacle, une salle..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                            autoFocus
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}