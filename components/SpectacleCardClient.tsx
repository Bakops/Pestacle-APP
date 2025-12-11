"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Spectacle } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Ticket, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/layout/CartContextComponent";
import { useState } from "react";

interface SpectacleCardClientProps {
  spectacle: Spectacle;
}

export default function SpectacleCardClient({
  spectacle,
}: SpectacleCardClientProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const formatDate = (value: string) => {
    const date = new Date(value)
    return date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })
  };

  const handleAddToCart = () => {
    addToCart({
      id: spectacle.id,
      name: spectacle.titre,
      price: spectacle.prixUnitaire,
      quantity: 1,
      image: spectacle.imageUrl || undefined,
      dateHeure: spectacle.dateHeure,
      lieu: spectacle.lieu || undefined,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Card className="group overflow-hidden border-0 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        {spectacle.imageUrl ? (
          <img
            src={spectacle.imageUrl}
            alt={spectacle.titre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
            <Ticket className="w-20 h-20 text-gray-400" />
          </div>
        )}

        <Badge
          className={`absolute top-4 right-4 border-0 font-medium px-3 py-1 rounded-full shadow-lg ${
            spectacle.statut === "DISPONIBLE"
              ? "bg-[#4ECDC4] text-white"
              : spectacle.statut === "COMPLET"
              ? "bg-[#FF6B6B] text-white"
              : spectacle.statut === "ANNULE"
              ? "bg-gray-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {spectacle.statut}
        </Badge>

        <div className="absolute inset-0 from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <button
          onClick={handleAddToCart}
          disabled={spectacle.statut !== "DISPONIBLE" || isAdded}
          className={`absolute bottom-6 left-6 right-6 h-12 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer font-medium text-white flex items-center justify-center gap-2 ${
            isAdded
              ? "bg-green-500"
              : spectacle.statut !== "DISPONIBLE"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#4ECDC4] hover:bg-[#FF6B6B]"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          {isAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
        </button>
      </div>

      <CardContent className="pr-5 pl-5 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-2 pt-4">
          <Calendar className="h-3.5 w-3.5 text-[#4ECDC4]" />
          <span className="text-xs font-medium text-gray-600">
            {formatDate(spectacle.dateHeure)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#4ECDC4] transition-colors duration-300">
          {spectacle.titre}
        </h3>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {spectacle.description || "Pas de description pour le moment."}
        </p>

        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-700 font-medium truncate">
              {spectacle.lieu ?? "À venir"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-700">
              <span className="font-semibold text-gray-900">
                {spectacle.placesDisponibles}
              </span>
              <span className="text-gray-500"> / {spectacle.capaciteTotale}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <p className="text-[#4ECDC4] font-bold text-xl">
            {spectacle.prixUnitaire.toFixed(2)} €
          </p>
          <span className="text-[10px] text-gray-400 font-medium">
            par personne
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
