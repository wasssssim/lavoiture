"use client";

import { useState } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function ShopNavbar() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#050a14]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline">
                Retour
              </span>
            </Link>
            <div className="w-px h-6 bg-white/10" />
            <Link href="/boutique" className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-[0.15em] text-white">
                LA
                <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
                  VOITURE
                </span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30 hidden sm:inline">
                Boutique
              </span>
            </Link>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-3 text-white/60 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
