"use client"

import { Headerpage } from "@/components/header-page"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { CheckCircle, Home } from "lucide-react"
import { useEffect } from "react"
import { useCart } from "@/components/layout/CartContextComponent"

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()

    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    fetch("http://localhost:8080/api/confirmation/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId,
        email: "adnan.mahboubi03@gmail.com"
      }),
    });
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Headerpage />
      <main className="flex-1">
        <div className="mt-20 bg-linear-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Paiement confirmé
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Paiement réussi !</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Votre réservation a été confirmée avec succès.
            </p>
          </div>
        </div>

        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-block mb-8 animate-bounce">
              <div className="absolute inset-0 bg-[#4ECDC4]/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 mx-auto bg-linear-to-br from-[#4ECDC4] to-[#44B3B0] rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Merci pour votre réservation !
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Vous allez recevoir un email de confirmation avec tous les détails de votre réservation 
              et vos billets électroniques.
            </p>

            <div className="bg-linear-to-br from-[#4ECDC4]/10 to-[#4ECDC4]/5 border border-[#4ECDC4]/20 rounded-2xl p-6 mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Prochaines étapes</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4] mt-0.5 shrink-0" />
                  <span>Vérifiez votre boîte mail pour votre confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4] mt-0.5 shrink-0" />
                  <span>Téléchargez vos billets électroniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4] mt-0.5 shrink-0" />
                  <span>Présentez-vous 15 minutes avant le début du spectacle</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-linear-to-r from-[#4ECDC4] to-[#44B3B0] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:from-[#44B3B0] hover:to-[#3A9A97] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </Link>
              
              <Link
                href="/spectacle"
                className="flex items-center justify-center gap-2 bg-white border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold py-4 px-8 rounded-full hover:bg-[#4ECDC4] hover:text-white transition-all duration-300"
              >
                Découvrir d'autres spectacles
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-10">
              Besoin d'aide ? Contactez-nous à{" "}
              <a href="mailto:support@example.com" className="text-[#4ECDC4] hover:underline font-medium">
                support@example.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
