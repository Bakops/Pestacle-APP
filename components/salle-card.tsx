"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, MapPin, Check, Copy } from "lucide-react"

interface Salle {
  id: number
  name: string
  image: string
  capacity: number
  amenities: string[]
  features: string[]
  address: string
  description: string
}

export default function SalleCard({ salle }: { salle: Salle }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(salle.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden border-0 bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="grid md:grid-cols-5 gap-0">
        {/* Image Section */}
        <div className="md:col-span-2 relative overflow-hidden h-64 md:h-auto">
          <img
            src={salle.image || "/placeholder.svg"}
            alt={salle.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#4ECDC4]" />
              <span className="text-sm font-bold text-gray-900">{salle.capacity}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#4ECDC4] transition-colors duration-300 mb-4">
              {salle.name}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">{salle.description}</p>

            <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-100">
              <MapPin className="h-5 w-5 text-[#4ECDC4] shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{salle.address}</span>

              <Button
                size="icon"
                onClick={handleCopy}
                className={`rounded-full ml-auto transition-all duration-300 ${
                  copied
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[#4ECDC4] hover:bg-[#000000]"
                }`}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Commodités
              </p>
              <div className="flex flex-wrap gap-2">
                {salle.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-[#4ECDC4]/10 text-[#4ECDC4] rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Équipements
              </p>
              <div className="grid grid-cols-1 gap-2">
                {salle.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full mt-8 bg-[#FF6B6B] hover:bg-[#000000] text-white font-medium h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            Voir les spectacles
          </Button>
        </div>
      </div>
    </Card>
  )
}
