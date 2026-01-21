"use client"

import { Button } from "@/components/ui/button"
import { Spectacle } from "@/lib/types"
import { useCart } from "@/components/layout/CartContextComponent"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
  spectacle: Spectacle
}

export default function AddToCartButton({ spectacle }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
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

  return (
    <Button
      onClick={handleAddToCart}
      disabled={spectacle.statut !== "DISPONIBLE" || isAdded}
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
