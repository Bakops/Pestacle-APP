"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Tag, Calendar } from "lucide-react"

interface Promo {
  id: number
  title: string
  image: string
  discount: string
  description: string
  code: string
  validUntil: string
  category: string
}

export default function PromoCard({ promo }: { promo: Promo }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden border-0 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={promo.image || "/placeholder.svg"}
          alt={promo.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-[#4ECDC4] text-white px-4 py-2 rounded-full font-bold text-xl shadow-lg">
          {promo.discount}
        </div>

        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 border-0 font-medium px-3 py-1">
          <Tag className="h-3 w-3 mr-1" />
          {promo.category}
        </Badge>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#4ECDC4] transition-colors duration-300">
          {promo.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {promo.description}
        </p>

        {/* Valid Until */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 pb-4 border-t border-gray-100 pt-4">
          <Calendar className="h-4 w-4 text-[#4ECDC4]" />
          <span>Valable jusqu'au <span className="font-semibold text-gray-900">{promo.validUntil}</span></span>
        </div>

        {/* Promo Code */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl mb-4 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
            Code promo
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 tracking-wider">
              {promo.code}
            </p>
            <Button
              size="icon"
              onClick={handleCopy}
              className={`rounded-full transition-all duration-300 ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#4ECDC4] hover:bg-[#5218CC]"
              }`}
            >
              {copied ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <Copy className="h-4 w-4 text-white" />
              )}
            </Button>
          </div>
        </div>

        <Button className="w-full bg-[#4ECDC4] hover:bg-[#5218CC] text-white font-medium h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          Utiliser cette offre
        </Button>
      </div>
    </Card>
  )
}