import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a14] via-[#0d1b2a] to-[#1a0a10]" />

      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-red/5 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-red/3 blur-[100px]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050a14] to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm mb-10">
          <Sparkles size={14} className="text-red" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50">
            Centre de Detailing
          </span>
        </div>

        <h1 className="text-[3.2rem] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-6">
          <span className="text-white">LA</span>
          <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
            VOITURE
          </span>
        </h1>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
          {["Renovation", "Protection", "Esthetique"].map((t, i) => (
            <span key={t} className="flex items-center gap-4 sm:gap-6">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-red/60" />}
              <span className="text-[10px] sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white/40">
                {t}
              </span>
            </span>
          ))}
        </div>

        <p className="text-base sm:text-lg text-white/30 max-w-lg mx-auto leading-relaxed mb-12 font-light">
          Sublimez votre vehicule avec nos prestations de detailing haut de
          gamme. L&apos;excellence au service de votre automobile.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#prestations"
            className="group relative px-10 py-4 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:shadow-2xl hover:shadow-red/20 hover:-translate-y-1"
          >
            <span className="relative z-10">Decouvrir</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-light to-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#contact"
            className="px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase text-white/50 border border-white/[0.08] hover:border-white/20 hover:text-white/80 hover:bg-white/[0.03] transition-all hover:-translate-y-1"
          >
            Nous contacter
          </a>
        </div>
      </div>

      <a
        href="#prestations"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <ChevronDown size={20} className="text-red/40" />
      </a>
    </section>
  );
}
