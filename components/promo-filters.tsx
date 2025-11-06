"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { reductionOptions } from "@/lib/data/promos"

interface PromoFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedReduction: number
    onReductionChange: (value: number) => void
}

export function PromoFilters({
                                 searchTerm,
                                 onSearchChange,
                                 selectedReduction,
                                 onReductionChange
                             }: PromoFiltersProps) {
    return (
        <div className="space-y-4 mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Rechercher une promo..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    value={selectedReduction.toString()}
                    onValueChange={(value) => onReductionChange(Number(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Réduction minimale" />
                    </SelectTrigger>
                    <SelectContent>
                        {reductionOptions.map((option, index) => (
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