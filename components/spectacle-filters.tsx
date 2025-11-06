"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { categories } from "@/lib/data/spectacles"

interface SpectacleFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedCategorie: string
    onCategorieChange: (value: string) => void
    selectedDate: string
    onDateChange: (value: string) => void
}

export function SpectacleFilters({
                                     searchTerm,
                                     onSearchChange,
                                     selectedCategorie,
                                     onCategorieChange,
                                     selectedDate,
                                     onDateChange
                                 }: SpectacleFiltersProps) {
    return (
        <div className="space-y-4 mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Rechercher un spectacle..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedCategorie} onValueChange={onCategorieChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="w-full"
                />
            </div>
        </div>
    )
}