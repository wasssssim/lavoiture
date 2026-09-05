"use client";

import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CURRENCY } from "@/lib/types";
import Link from "next/link";

function formatPrice(price: number): string {
  return price.toLocaleString("fr-DZ");
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, updateQuantity, removeItem, itemCount, total } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-[#0a1120] border-l border-white/5 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-red" />
              <h2 className="text-lg font-bold text-white">
                Panier ({itemCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag
                  size={48}
                  className="mx-auto text-white/10 mb-4"
                />
                <p className="text-white/30 text-sm">Votre panier est vide</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-red font-bold mt-1">
                      {formatPrice(item.product.price)} {CURRENCY}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/20 hover:text-red transition-colors ml-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/50">Total</span>
                <span className="text-xl font-black text-white">
                  {formatPrice(total)} <span className="text-sm font-normal text-white/30">{CURRENCY}</span>
                </span>
              </div>
              <Link
                href="/boutique/panier"
                onClick={onClose}
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 transition-all"
              >
                Commander
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
