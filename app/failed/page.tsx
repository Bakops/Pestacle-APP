"use client"

import { HeaderPage } from "@/components/header-page"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { XCircle, Home, ShoppingCart } from "lucide-react"

export default function FailedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderPage />
      <main className="flex-1">
        <div className="mt-20 bg-linear-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Paiement échoué
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Paiement non abouti</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Une erreur est survenue lors du traitement de votre paiement.
            </p>
          </div>
        </div>

        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-block mb-8 animate-pulse">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 mx-auto bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <XCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Le paiement n'a pas pu être effectué
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Votre paiement n'a pas été traité. Aucune somme n'a été débitée de votre compte.
              Vos articles sont toujours dans votre panier.
            </p>

            <div className="bg-linear-to-br from-red-50 to-red-50/50 border border-red-200 rounded-2xl p-6 mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Raisons possibles</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span>Informations de carte bancaire incorrectes</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span>Fonds insuffisants sur votre compte</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span>Problème de connexion ou transaction annulée</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span>Limites de paiement atteintes</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                Retourner au panier
              </Link>
              
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-full hover:bg-gray-50 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-10">
              Besoin d'aide ? Contactez-nous à{" "}
              <a href="mailto:support@pestacle.com" className="text-red-500 hover:underline font-medium">
                support@pestacle.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
