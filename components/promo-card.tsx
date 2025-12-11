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
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <img
          src={promo.image || "/placeholder.svg"}
          alt={promo.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Discount Badge */}
        <Badge className="absolute top-4 right-4 bg-[#4ECDC4] text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg border-0">
          {promo.discount}
        </Badge>

        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 border-0 font-medium px-3 py-1 text-xs">
          <Tag className="h-3 w-3 mr-1" />
          {promo.category}
        </Badge>
        
        <div className="absolute inset-0 from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <Button className="absolute bottom-6 left-6 right-6 bg-[#4ECDC4] hover:bg-[#FF6B6B] text-white font-medium h-12 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
          Utiliser cette offre
        </Button>
      </div>

      {/* Content */}
      <div className="pr-5 pl-5 pb-4 flex flex-col flex-1 bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#4ECDC4] transition-colors duration-300 pt-4">
          {promo.title}
        </h3>

        <p className="text-xs text-gray-600 mb-3 flex-1 leading-relaxed line-clamp-2">
          {promo.description}
        </p>

        {/* Valid Until */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 pb-3 border-t border-gray-100 pt-3">
          <Calendar className="h-3.5 w-3.5 text-[#4ECDC4]" />
          <span>Valable jusqu'au <span className="font-semibold text-gray-900">{promo.validUntil}</span></span>
        </div>

        {/* Promo Code */}
        <div className="bg-gray-50 p-3 rounded-lg mb-3 border border-gray-200">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 font-semibold">
            Code
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold text-gray-900 tracking-wider">
              {promo.code}
            </p>
            <Button
              size="sm"
              onClick={handleCopy}
              className={`rounded-full transition-all duration-300 h-8 w-8 p-0 ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#4ECDC4] hover:bg-[#FF6B6B]"
              }`}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-white" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}