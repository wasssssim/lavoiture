"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { Category, categoryLabels } from "@/lib/types";
import ProductCard from "@/components/shop/ProductCard";

const categories: (Category | "all")[] = [
  "all",
  "soin",
  "protection",
  "interieur",
  "pack",
  "produit-ext",
  "produit-int",
  "accessoire",
];

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
          Boutique
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Prestations &{" "}
          <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
            Produits
          </span>
        </h1>
        <p className="text-white/30 max-w-md mx-auto text-base">
          Selectionnez vos prestations ou produits et envoyez votre demande. Nous
          vous recontacterons pour confirmer.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-red to-red-dark text-white shadow-lg shadow-red/20"
                : "bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/70 hover:border-white/10"
            }`}
          >
            {cat === "all" ? "Tout" : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
