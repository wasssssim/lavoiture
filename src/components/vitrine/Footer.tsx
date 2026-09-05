import { Phone } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Prestations", href: "#prestations" },
  { label: "A propos", href: "#apropos" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Polissage",
  "Protection ceramique",
  "Film PPF",
  "Nettoyage interieur",
  "Lavage premium",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#050a14]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-lg font-extrabold tracking-[0.2em] text-white mb-4">
              LA
              <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
                VOITURE
              </span>
            </div>
            <p className="text-sm text-white/25 leading-relaxed max-w-xs">
              Centre de detailing automobile. Renovation, protection et
              esthetique au service de votre vehicule.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/25 hover:text-red transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-5">
              Prestations
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#prestations"
                    className="text-sm text-white/25 hover:text-red transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0770275161"
                  className="inline-flex items-center gap-2 text-sm text-white/25 hover:text-red transition-colors"
                >
                  <Phone size={12} />
                  0770 27 51 61
                </a>
              </li>
              <li>
                <a
                  href="tel:0776759818"
                  className="inline-flex items-center gap-2 text-sm text-white/25 hover:text-red transition-colors"
                >
                  <Phone size={12} />
                  0776 75 98 18
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/15">
            &copy; 2024 LAVOITURE. Tous droits reserves.
          </p>
          <p className="text-xs text-white/15">
            Centre de Detailing Automobile
          </p>
        </div>
      </div>
    </footer>
  );
}
