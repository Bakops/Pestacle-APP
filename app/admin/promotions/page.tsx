"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Percent, Plus, Pencil, Trash2, Search, ArrowLeft, TrendingDown } from "lucide-react"
import { getSpectaclesPromo, type SpectaclePromo } from "@/lib/data/promos"

export default function AdminPromotionsPage() {
    const [promos, setPromos] = useState<SpectaclePromo[]>([])
    const [filteredPromos, setFilteredPromos] = useState<SpectaclePromo[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [deleteDialog, setDeleteDialog] = useState<{open: boolean, promo: SpectaclePromo | null}>({
        open: false,
        promo: null
    })

    useEffect(() => {
        const loadPromos = async () => {
            const data = await getSpectaclesPromo()
            setPromos(data)
            setFilteredPromos(data)
            setLoading(false)
        }
        loadPromos()
    }, [])

    useEffect(() => {
        const filtered = promos.filter(promo =>
            promo.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.codePromo?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPromos(filtered)
    }, [searchTerm, promos])

    const handleDelete = (promo: SpectaclePromo) => {
        setDeleteDialog({ open: true, promo })
    }

    const confirmDelete = () => {
        if (deleteDialog.promo) {
            const newPromos = promos.filter(p => p.id !== deleteDialog.promo?.id)
            setPromos(newPromos)
            console.log("Suppression de la promotion:", deleteDialog.promo.id)
        }
        setDeleteDialog({ open: false, promo: null })
    }

    const isPromoActive = (promo: SpectaclePromo) => {
        const now = new Date()
        const debut = new Date(promo.dateDebutPromo)
        const fin = new Date(promo.dateFinPromo)
        return now >= debut && now <= fin
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="mb-8">
                    <Button asChild variant="ghost" className="mb-4">
                        <Link href="/admin">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à l'admin
                        </Link>
                    </Button>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Percent className="h-8 w-8 text-destructive" />
                            <div>
                                <h1 className="text-4xl font-bold">Gestion des Promotions</h1>
                                <p className="text-muted-foreground">
                                    {filteredPromos.length} promotion{filteredPromos.length > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href="/admin/promotions/ajouter">
                                <Plus className="mr-2 h-4 w-4" />
                                Créer une promotion
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Rechercher une promotion..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Chargement...</p>
                    </div>
                ) : (
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Spectacle</TableHead>
                                    <TableHead>Réduction</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead>Code Promo</TableHead>
                                    <TableHead>Période</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPromos.map((promo) => {
                                    const active = isPromoActive(promo)
                                    return (
                                        <TableRow key={promo.id}>
                                            <TableCell className="font-medium">{promo.titre}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-destructive text-destructive-foreground">
                                                    -{promo.pourcentageReduction}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-destructive">{promo.prix}€</span>
                                                    <span className="text-xs text-muted-foreground line-through">
                            {promo.prixOriginal}€
                          </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {promo.codePromo && (
                                                    <Badge variant="outline" className="font-mono">
                                                        {promo.codePromo}
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                <div>
                                                    {new Date(promo.dateDebutPromo).toLocaleDateString('fr-FR')}
                                                </div>
                                                <div className="text-muted-foreground">
                                                    au {new Date(promo.dateFinPromo).toLocaleDateString('fr-FR')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {active ? (
                                                    <Badge className="bg-green-500 text-white">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Expirée</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Link href={`/admin/promotions/modifier/${promo.id}`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(promo)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({open, promo: null})}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer la promotion "{deleteDialog.promo?.titre}" ?
                                Cette action est irréversible.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
            <Footer />
        </div>
    )
}