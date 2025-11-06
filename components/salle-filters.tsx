"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { villes, capaciteOptions } from "@/lib/data/salles"

interface SalleFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedVille: string
    onVilleChange: (value: string) => void
    selectedCapacite: number
    onCapaciteChange: (value: number) => void
}

export function SalleFilters({
                                 searchTerm,
                                 onSearchChange,
                                 selectedVille,
                                 onVilleChange,
                                 selectedCapacite,
                                 onCapaciteChange
                             }: SalleFiltersProps) {
    return (
        <div className="space-y-4 mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Rechercher une salle..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedVille} onValueChange={onVilleChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Toutes les villes" />
                    </SelectTrigger>
                    <SelectContent>
                        {villes.map((ville) => (
                            <SelectItem key={ville} value={ville}>
                                {ville}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={selectedCapacite.toString()}
                    onValueChange={(value) => onCapaciteChange(Number(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Capacité" />
                    </SelectTrigger>
                    <SelectContent>
                        {capaciteOptions.map((option, index) => (
                            <SelectItem key={index} value={option.value.toString()}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}