"use client";

import { useState, useEffect } from "react";
import { Phone, X, Menu, ShoppingBag } from "lucide-react";
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
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050a14]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
        <a href="#accueil" className="relative z-50">
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
          className="lg:hidden relative z-50 p-2 text-white"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050a14]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 lg:hidden transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-2xl font-light tracking-[0.3em] uppercase text-white/80 hover:text-red transition-colors"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`,
            }}
          >
            {l.label}
          </a>
        ))}
        <Link
          href="/boutique"
          onClick={() => setOpen(false)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white/80 font-bold tracking-widest uppercase border border-white/10 hover:border-red/30 transition-colors"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s",
          }}
        >
          <ShoppingBag size={18} />
          Boutique
        </Link>
        <a
          href="tel:0770275161"
          className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red to-red-dark rounded-full text-white font-bold tracking-widest uppercase"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.3s ease 0.35s, transform 0.3s ease 0.35s",
          }}
        >
          <Phone size={18} />
          0770 27 51 61
        </a>
      </div>
    </nav>
  );
}
