"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function InscriptionPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas")
            return
        }

        setLoading(true)

        // Simulation d'une inscription (à remplacer par vraie API)
        setTimeout(() => {
            console.log("Inscription avec:", formData)
            setLoading(false)
            router.push("/connexion")
        }, 1000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <UserPlus className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl text-center">Inscription</CardTitle>
                        <CardDescription className="text-center">
                            Créez votre compte Pestacle en quelques secondes
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prenom">Prénom</Label>
                                    <Input
                                        id="prenom"
                                        type="text"
                                        placeholder="Jean"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom</Label>
                                    <Input
                                        id="nom"
                                        type="text"
                                        placeholder="Dupont"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Inscription en cours..." : "S'inscrire"}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Déjà un compte ?{" "}
                                <Link href="/connexion" className="text-primary hover:underline font-medium">
                                    Connectez-vous
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </main>
            <Footer />
        </div>
    )
}