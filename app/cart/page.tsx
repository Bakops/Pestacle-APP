"use client";
import { useCart } from "@/components/layout/CartContextComponent";
import { Headerpage } from "@/components/header-page";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const amount = Math.round(total * 100);
      const res = await fetch(
        "https://api-spring-l3i0.onrender.com/stripe/checkout?amount=" + amount,
        {
          method: "POST",
        }
      );
      const url = await res.text();
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        alert("Erreur lors de la redirection vers Stripe.");
      }
    } catch (e) {
      alert("Erreur lors de la connexion à Stripe.");
    }
    setLoading(false);
  };

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

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
                Votre réservation
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Mon panier</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Gérez vos réservations de spectacles
            </p>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Panier vide</h2>
                <p className="text-gray-600 mb-6">
                  Vous n'avez pas encore de spectacles réservés.
                </p>
                <Link
                  href="/spectacle"
                  className="inline-block bg-[#4ECDC4] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#5218CC] transition-colors"
                >
                  Découvrir les spectacles
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300 ${
                        removingId === item.id
                          ? "opacity-0 scale-95 blur-sm"
                          : "opacity-100 scale-100"
                      }`}
                      style={{ animationDelay: `${idx * 0.07 + 0.1}s` }}
                    >
                      {/* Image */}
                      {item.image && (
                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}


                      <div className="flex-1 flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        {item.dateHeure && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date :</span> {new Date(item.dateHeure).toLocaleString("fr-FR", {
                              dateStyle: "medium",
                              timeStyle: "short"
                            })}
                          </p>
                        )}
                        {item.lieu && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Lieu :</span> {item.lieu}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-[#4ECDC4]">
                          {item.price.toFixed(2)} € par place
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3 md:items-end">
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Diminuer la quantité"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Augmenter la quantité"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)} €
                        </p>

                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={removingId === item.id}
                          className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                          title="Supprimer du panier"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm font-medium">Supprimer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-linear-to-br from-[#4ECDC4]/10 to-[#4ECDC4]/5 border border-[#4ECDC4]/20 rounded-2xl p-6 mb-8">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Sous-total</span>
                      <span className="font-medium">{total.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm">
                      <span>Frais de traitement</span>
                      <span className="font-medium">Gratuit</span>
                    </div>
                    <div className="border-t border-[#4ECDC4]/20 pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total TTC</span>
                      <span className="text-3xl font-bold text-[#4ECDC4]">
                        {total.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`flex-1 bg-linear-to-r from-[#4ECDC4] to-[#44B3B0] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:from-[#44B3B0] hover:to-[#3A9A97] hover:shadow-lg"
                    }`}
                  >
                    {loading ? "Redirection vers Stripe..." : "Procéder au paiement"}
                  </button>
                  <button
                    onClick={clearCart}
                    disabled={loading}
                    className="flex-1 bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Vider le panier
                  </button>
                  <Link
                    href="/spectacle"
                    className="flex-1 bg-white border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold py-3 px-6 rounded-full text-center hover:bg-[#4ECDC4] hover:text-white transition-colors"
                  >
                    Continuer les achats
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
