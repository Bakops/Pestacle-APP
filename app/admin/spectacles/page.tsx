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
import { Theater, Plus, Pencil, Trash2, Search, ArrowLeft } from "lucide-react"
import { getSpectacles, type Spectacle } from "@/lib/data/spectacles"

export default function AdminSpectaclesPage() {
    const [spectacles, setSpectacles] = useState<Spectacle[]>([])
    const [filteredSpectacles, setFilteredSpectacles] = useState<Spectacle[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [deleteDialog, setDeleteDialog] = useState<{open: boolean, spectacle: Spectacle | null}>({
        open: false,
        spectacle: null
    })

    useEffect(() => {
        const loadSpectacles = async () => {
            const data = await getSpectacles()
            setSpectacles(data)
            setFilteredSpectacles(data)
            setLoading(false)
        }
        loadSpectacles()
    }, [])

    useEffect(() => {
        const filtered = spectacles.filter(spectacle =>
            spectacle.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spectacle.lieu.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredSpectacles(filtered)
    }, [searchTerm, spectacles])

    const handleDelete = (spectacle: Spectacle) => {
        setDeleteDialog({ open: true, spectacle })
    }

    const confirmDelete = () => {
        if (deleteDialog.spectacle) {
            const newSpectacles = spectacles.filter(s => s.id !== deleteDialog.spectacle?.id)
            setSpectacles(newSpectacles)
            console.log("Suppression du spectacle:", deleteDialog.spectacle.id)
        }
        setDeleteDialog({ open: false, spectacle: null })
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
                            <Theater className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-4xl font-bold">Gestion des Spectacles</h1>
                                <p className="text-muted-foreground">
                                    {filteredSpectacles.length} spectacle{filteredSpectacles.length > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href="/admin/spectacles/ajouter">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un spectacle
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
                                placeholder="Rechercher un spectacle..."
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
                                    <TableHead>Titre</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Lieu</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSpectacles.map((spectacle) => (
                                    <TableRow key={spectacle.id}>
                                        <TableCell className="font-medium">{spectacle.titre}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{spectacle.categorie}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(spectacle.date).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell>{spectacle.lieu}</TableCell>
                                        <TableCell className="font-semibold">{spectacle.prix}€</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link href={`/admin/spectacles/modifier/${spectacle.id}`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(spectacle)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({open, spectacle: null})}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer le spectacle "{deleteDialog.spectacle?.titre}" ?
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