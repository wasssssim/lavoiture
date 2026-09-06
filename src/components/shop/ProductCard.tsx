"use client";

import { ShoppingCart, Check, ImageIcon } from "lucide-react";
import { Product, CURRENCY } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";

function formatPrice(price: number): string {
  return price.toLocaleString("fr-DZ");
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="group relative flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-red/20 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#0d1b2a] to-[#1a0a10] overflow-hidden">
        {product.image && !imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <ImageIcon size={32} className="text-white/10" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/15">
              Photo a venir
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-white mb-1.5">{product.name}</h3>
        <p className="text-xs text-white/35 leading-relaxed mb-5 flex-1">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <span className="text-xl font-black text-red">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-white/30 ml-1">{CURRENCY}</span>
          </div>

          {product.inStock ? (
            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
                added
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-gradient-to-r from-red to-red-dark text-white hover:shadow-lg hover:shadow-red/25 hover:-translate-y-0.5"
              }`}
            >
              {added ? (
                <>
                  <Check size={13} />
                  Ajoute
                </>
              ) : (
                <>
                  <ShoppingCart size={13} />
                  Ajouter
                </>
              )}
            </button>
          ) : (
            <span className="px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/5 text-white/20 border border-white/5">
              Indisponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
