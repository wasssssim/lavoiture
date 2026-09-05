"use client";

import { Phone, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-[#0a1525] to-[#050a14]" />

      {/* Accent orb */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-red/3 blur-[150px] translate-x-1/3" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Prenez{" "}
            <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
              rendez-vous
            </span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto">
            Contactez-nous pour un devis gratuit et personnalise
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <AnimatedSection>
            <a
              href="tel:0770275161"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-red/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-red/10 border border-red/15 flex items-center justify-center shrink-0 group-hover:bg-red/15 transition-colors">
                <Phone size={22} className="text-red" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-1">
                  Telephone
                </div>
                <div className="text-white font-semibold">0770 27 51 61</div>
              </div>
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <a
              href="tel:0776759818"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-red/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-red/10 border border-red/15 flex items-center justify-center shrink-0 group-hover:bg-red/15 transition-colors">
                <Phone size={22} className="text-red" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-1">
                  Telephone 2
                </div>
                <div className="text-white font-semibold">0776 75 98 18</div>
              </div>
            </a>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="flex items-center justify-center gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <MapPin size={20} className="text-red/40" strokeWidth={1.5} />
            <span className="text-sm text-white/30 font-medium">
              Adresse a venir
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
