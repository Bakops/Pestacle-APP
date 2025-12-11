"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/layout/CartContextComponent";

export function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-lg"
    >
      <ShoppingBag className="h-5 w-5" />
      <span>Panier</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
