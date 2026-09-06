"use client";

import { useState, useEffect } from "react";
import { Phone, X, Menu, ShoppingBag, CalendarCheck } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Prestations", href: "#prestations" },
  { label: "A propos", href: "#apropos" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: scrolled ? "#050a14" : "rgba(5,10,20,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
          <a href="#accueil">
            <span className="text-xl font-extrabold tracking-[0.25em] text-white">
              LA
              <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
                VOITURE
              </span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-red to-red-light group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase text-white/50 border border-white/[0.08] hover:border-red/30 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
            >
              <CalendarCheck size={14} />
              Reservation
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase text-white/50 border border-white/[0.08] hover:border-red/30 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
            >
              <ShoppingBag size={14} />
              Boutique
            </Link>
            <a
              href="tel:0770275161"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-xs font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone size={14} />
              Appeler
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            backgroundColor: "#050a14",
          }}
          className="overflow-y-auto lg:hidden"
        >
          <div className="flex items-center justify-between h-20 px-6">
            <a href="#accueil" onClick={() => setOpen(false)}>
              <span className="text-xl font-extrabold tracking-[0.25em] text-white">
                LA
                <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
                  VOITURE
                </span>
              </span>
            </a>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-white"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-5 py-12 px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-xl font-light tracking-[0.3em] uppercase text-white/80 hover:text-red transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col items-center gap-3 mt-4">
              <Link
                href="/reservation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-white/80 font-bold tracking-widest uppercase text-sm border border-white/10 hover:border-red/30 transition-colors"
              >
                <CalendarCheck size={16} />
                Reservation
              </Link>
              <Link
                href="/boutique"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-white/80 font-bold tracking-widest uppercase text-sm border border-white/10 hover:border-red/30 transition-colors"
              >
                <ShoppingBag size={16} />
                Boutique
              </Link>
              <a
                href="tel:0770275161"
                className="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white font-bold tracking-widest uppercase text-sm"
              >
                <Phone size={16} />
                0770 27 51 61
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
