"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Theater, Building2, Percent, BarChart3, Users } from "lucide-react"

export default function AdminPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-8 w-8 text-destructive" />
                        <h1 className="text-4xl font-bold">Espace Administrateur</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Gérez les spectacles, salles et promotions de la plateforme
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Gestion des spectacles */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Theater className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Spectacles</CardTitle>
                                    <CardDescription>Gérer les spectacles</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/admin/spectacles">
                                    Voir tous les spectacles
                                </Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/admin/spectacles/ajouter">
                                    Ajouter un spectacle
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Gestion des salles */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <Building2 className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <CardTitle>Salles</CardTitle>
                                    <CardDescription>Gérer les salles</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/admin/salles">
                                    Voir toutes les salles
                                </Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/admin/salles/ajouter">
                                    Ajouter une salle
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Gestion des promotions */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-destructive/10 rounded-lg">
                                    <Percent className="h-6 w-6 text-destructive" />
                                </div>
                                <div>
                                    <CardTitle>Promotions</CardTitle>
                                    <CardDescription>Gérer les promos</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/admin/promotions">
                                    Voir toutes les promos
                                </Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/admin/promotions/ajouter">
                                    Créer une promotion
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Statistiques */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <BarChart3 className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <CardTitle>Statistiques</CardTitle>
                                    <CardDescription>Voir les stats</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/admin/statistiques">
                                    Accéder aux statistiques
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Gestion des utilisateurs */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <Users className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <CardTitle>Utilisateurs</CardTitle>
                                    <CardDescription>Gérer les users</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/admin/utilisateurs">
                                    Voir les utilisateurs
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}