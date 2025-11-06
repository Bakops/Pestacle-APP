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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, AlertCircle } from "lucide-react"
import { login } from "@/lib/data/auth"

export default function ConnexionPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const user = await login(email, password)

            if (user) {
                console.log("Connexion réussie:", user)
                // Ici tu pourrais stocker l'utilisateur dans un contexte ou localStorage
                // localStorage.setItem("user", JSON.stringify(user))
                router.push("/")
            } else {
                setError("Email ou mot de passe incorrect")
            }
        } catch (err) {
            setError("Une erreur est survenue lors de la connexion")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <LogIn className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl text-center">Connexion</CardTitle>
                        <CardDescription className="text-center">
                            Connectez-vous à votre compte Pestacle
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:underline">
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="bg-muted p-3 rounded-lg text-xs space-y-1">
                                <p className="font-semibold">Comptes de test :</p>
                                <p>👤 User: user@pestacle.com / user123</p>
                                <p>🔐 Admin: admin@pestacle.com / admin123</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Connexion en cours..." : "Se connecter"}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Pas encore de compte ?{" "}
                                <Link href="/inscription" className="text-primary hover:underline font-medium">
                                    Inscrivez-vous
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