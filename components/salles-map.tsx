"use client"

import { useEffect, useRef } from "react"
import type { Salle } from "@/lib/data/salles"

interface SallesMapProps {
    salles: Salle[]
    onMarkerClick?: (salleId: string) => void
}

export function SallesMap({ salles, onMarkerClick }: SallesMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)

    useEffect(() => {
        if (typeof window === "undefined" || !mapRef.current) return

        // Import dynamique de Leaflet côté client uniquement
        const initMap = async () => {
            // Import du CSS via CDN dans le head
            if (!document.querySelector('link[href*="leaflet.css"]')) {
                const link = document.createElement("link")
                link.rel = "stylesheet"
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                document.head.appendChild(link)
            }

            const L = (await import("leaflet")).default

            // Fix pour les icônes Leaflet
            delete (L.Icon.Default.prototype as any)._getIconUrl
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            })

            // Nettoyer la carte existante si elle existe
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
            }

            // Créer la carte
            const map = L.map(mapRef.current as HTMLElement).setView([48.8566, 2.3522], 12)

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map)

            // Ajouter les marqueurs
            salles.forEach((salle) => {
                const marker = L.marker([salle.coordonnees.lat, salle.coordonnees.lng]).addTo(map)

                marker.bindPopup(`
          <div style="font-family: system-ui; min-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">${salle.nom}</h3>
            <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${salle.adresse}</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 8px;">${salle.capacite} places</p>
            <a href="/salles/${salle.id}" style="color: #000; text-decoration: underline; font-size: 14px;">Voir les détails</a>
          </div>
        `)

                if (onMarkerClick) {
                    marker.on("click", () => onMarkerClick(salle.id))
                }
            })

            // Ajuster la vue pour afficher tous les marqueurs
            if (salles.length > 0) {
                const bounds = L.latLngBounds(salles.map(s => [s.coordonnees.lat, s.coordonnees.lng]))
                map.fitBounds(bounds, { padding: [50, 50] })
            }

            mapInstanceRef.current = map
        }

        initMap()

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [salles, onMarkerClick])

    return <div ref={mapRef} className="w-full h-[400px] rounded-lg border" />
}