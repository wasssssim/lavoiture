"use client";

import { Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Counter from "@/components/ui/Counter";

const features = [
  "Produits professionnels haut de gamme",
  "Techniques de detailing certifiees",
  "Satisfaction client garantie",
  "Devis gratuit et personnalise",
];

const stats = [
  { value: 500, label: "Vehicules traites" },
  { value: 100, label: "Clients satisfaits" },
  { value: 6, label: "Prestations" },
  { value: 5, label: "Ans d'experience" },
];

export default function About() {
  return (
    <section id="apropos" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-[#0a1525] to-[#050a14]" />

      {/* Accent orb */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-red/3 blur-[120px] -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <AnimatedSection>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
              A propos
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
              L&apos;art du detailing{" "}
              <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
                automobile
              </span>
            </h2>
            <p className="text-white/35 leading-relaxed mb-4">
              LAVOITURE est un centre de detailing automobile dedie a la
              renovation, la protection et l&apos;esthetique de votre vehicule.
              Notre equipe passionnee met son expertise au service de chaque
              voiture.
            </p>
            <p className="text-white/35 leading-relaxed mb-10">
              Nous utilisons exclusivement des produits professionnels et des
              techniques de pointe pour garantir des resultats d&apos;exception.
            </p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <AnimatedSection
                  key={f}
                  delay={i * 0.08}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-red/10 border border-red/15 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-red" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-white/60 font-medium">
                    {f}
                  </span>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Stats card */}
          <AnimatedSection delay={0.2}>
            <div className="relative p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-red/10 blur-[60px]" />

              <div className="relative grid grid-cols-2 gap-10">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <Counter target={s.value} />
                    <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mt-2">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
