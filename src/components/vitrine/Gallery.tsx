"use client";

import { ImageIcon } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const items = [
  { label: "Polissage", gradient: "from-red-dark/30 to-navy-light/80" },
  { label: "Ceramique", gradient: "from-navy-light/80 to-red-dark/20" },
  { label: "Interieur", gradient: "from-red-dark/20 to-navy-light/80" },
  { label: "Optiques", gradient: "from-navy-light/80 to-red-dark/30" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-[#080f1e] to-[#050a14]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
            Galerie
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Nos{" "}
            <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
              realisations
            </span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto">
            Avant / Apres — decouvrez la transformation
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1}>
              <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-red/20 transition-all duration-500 cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ImageIcon
                      size={28}
                      className="text-red/40"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors">
                    {item.label}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
