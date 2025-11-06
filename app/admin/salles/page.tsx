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
import { Building2, Plus, Pencil, Trash2, Search, ArrowLeft } from "lucide-react"
import { getSalles, type Salle } from "@/lib/data/salles"

export default function AdminSallesPage() {
    const [salles, setSalles] = useState<Salle[]>([])
    const [filteredSalles, setFilteredSalles] = useState<Salle[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [deleteDialog, setDeleteDialog] = useState<{open: boolean, salle: Salle | null}>({
        open: false,
        salle: null
    })

    useEffect(() => {
        const loadSalles = async () => {
            const data = await getSalles()
            setSalles(data)
            setFilteredSalles(data)
            setLoading(false)
        }
        loadSalles()
    }, [])

    useEffect(() => {
        const filtered = salles.filter(salle =>
            salle.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.ville.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredSalles(filtered)
    }, [searchTerm, salles])

    const handleDelete = (salle: Salle) => {
        setDeleteDialog({ open: true, salle })
    }

    const confirmDelete = () => {
        if (deleteDialog.salle) {
            const newSalles = salles.filter(s => s.id !== deleteDialog.salle?.id)
            setSalles(newSalles)
            console.log("Suppression de la salle:", deleteDialog.salle.id)
        }
        setDeleteDialog({ open: false, salle: null })
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
                            <Building2 className="h-8 w-8 text-accent" />
                            <div>
                                <h1 className="text-4xl font-bold">Gestion des Salles</h1>
                                <p className="text-muted-foreground">
                                    {filteredSalles.length} salle{filteredSalles.length > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href="/admin/salles/ajouter">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter une salle
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
                                placeholder="Rechercher une salle..."
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
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Ville</TableHead>
                                    <TableHead>Adresse</TableHead>
                                    <TableHead>Capacité</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSalles.map((salle) => (
                                    <TableRow key={salle.id}>
                                        <TableCell className="font-medium">{salle.nom}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{salle.ville}</Badge>
                                        </TableCell>
                                        <TableCell>{salle.adresse}</TableCell>
                                        <TableCell className="font-semibold">{salle.capacite} places</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link href={`/admin/salles/modifier/${salle.id}`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(salle)}
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

                <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({open, salle: null})}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer la salle "{deleteDialog.salle?.nom}" ?
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