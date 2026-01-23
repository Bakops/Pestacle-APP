"use client"

import { Button } from "@/components/ui/button"
import { Spectacle } from "@/lib/types"
import { useCart } from "@/components/layout/CartContextComponent"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"

interface AddToCartButtonProps {
  spectacle: Spectacle
}

export default function AddToCartButton({ spectacle }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { user, isLoading } = useUser()
  const [isAdded, setIsAdded] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleAddToCart = () => {
    if (!user && !isLoading) {
      setShowLoginPrompt(true)
      return
    }

    addToCart({
      id: spectacle.id,
      name: spectacle.titre,
      price: spectacle.prixUnitaire,
      quantity: 1,
      image: spectacle.imageUrl || undefined,
      dateHeure: spectacle.dateHeure,
      lieu: spectacle.lieu || undefined,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (showLoginPrompt) {
    return (
      <div className="w-full space-y-3">
        <p className="text-sm text-gray-600 text-center font-medium">Vous devez être connecté pour réserver</p>
        <Link href="/api/auth/login" className="block">
          <Button className="w-full h-12 bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white font-semibold rounded-lg">
            Se connecter pour réserver
          </Button>
        </Link>
        <Button 
          onClick={() => setShowLoginPrompt(false)}
          variant="outline"
          className="w-full h-12 border-2 border-gray-300 text-gray-600 font-semibold rounded-lg"
        >
          Annuler
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={spectacle.statut !== "DISPONIBLE" || isAdded || isLoading}
      className={`w-full h-12 rounded-lg shadow-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
        isAdded
          ? "bg-green-500 hover:bg-green-600"
          : spectacle.statut !== "DISPONIBLE"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#4ECDC4] hover:bg-[#3DBDB5]"
      }`}
    >
      <ShoppingBag className="h-5 w-5" />
      {isAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </Button>
  )
}
