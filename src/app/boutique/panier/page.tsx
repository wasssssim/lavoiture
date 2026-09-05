"use client";

import { useCart } from "@/context/CartContext";
import OrderForm from "@/components/shop/OrderForm";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function PanierPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={64} className="mx-auto text-white/10 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-3">Panier vide</h1>
        <p className="text-white/30 mb-8">
          Ajoutez des prestations depuis notre boutique pour passer commande.
        </p>
        <Link
          href="/boutique"
          className="inline-flex px-8 py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 transition-all"
        >
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
          Commande
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Finalisez votre{" "}
          <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
            commande
          </span>
        </h1>
        <p className="text-white/30 text-sm">
          Remplissez vos informations pour recevoir un recapitulatif par email
        </p>
      </div>

      <OrderForm />
    </div>
  );
}
