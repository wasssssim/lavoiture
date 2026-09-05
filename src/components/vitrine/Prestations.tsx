"use client";

import {
  Sparkles,
  Shield,
  Film,
  Armchair,
  Lightbulb,
  Droplets,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const services = [
  {
    icon: Sparkles,
    title: "Polissage & Correction",
    desc: "Elimination des micro-rayures, swirls et defauts de peinture. Restauration de l'eclat d'origine avec des produits professionnels.",
  },
  {
    icon: Shield,
    title: "Protection Ceramique",
    desc: "Traitement ceramique longue duree pour une protection optimale contre les UV, intemperies et agressions exterieures.",
  },
  {
    icon: Film,
    title: "Film de Protection PPF",
    desc: "Film transparent haute performance contre impacts, graviers et rayures. Protection invisible, resultat impeccable.",
  },
  {
    icon: Armchair,
    title: "Nettoyage Interieur",
    desc: "Nettoyage en profondeur de l'habitacle : cuir, tissus, plastiques, moquettes. Desinfection complete.",
  },
  {
    icon: Lightbulb,
    title: "Renovation Optiques",
    desc: "Restauration des phares ternis ou opaques. Retrouvez une visibilite optimale et un aspect neuf.",
  },
  {
    icon: Droplets,
    title: "Lavage Premium",
    desc: "Lavage complet a la main, techniques professionnelles et produits haut de gamme. Finitions soignees.",
  },
];

export default function Prestations() {
  return (
    <section id="prestations" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-[#080f1e] to-[#050a14]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
            Nos prestations
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            L&apos;excellence du
            <br />
            <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
              detailing
            </span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto text-base">
            Des services professionnels pour sublimer et proteger votre vehicule
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.08}>
              <div className="group relative h-full p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-red/20 hover:bg-white/[0.04] transition-all duration-500 cursor-default">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-red/10 border border-red/10 flex items-center justify-center mb-6 group-hover:bg-red/15 group-hover:border-red/20 transition-all duration-500">
                    <s.icon size={22} className="text-red" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                    {s.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
