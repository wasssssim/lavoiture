"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const prestations = [
  "Polissage Standard",
  "Polissage Complet",
  "Renovation Optiques",
  "Protection Ceramique 1 an",
  "Protection Ceramique 3 ans",
  "Film PPF Face Avant",
  "Film PPF Complet",
  "Nettoyage Interieur Standard",
  "Nettoyage Interieur Complet",
  "Traitement Cuir",
  "Pack Essentiel",
  "Pack Premium",
  "Pack Ultimate",
];

type Slot = { time: string; available: boolean };

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [prestation, setPrestation] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [closed, setClosed] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Generate next 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    if (!date) return;
    setLoadingSlots(true);
    setTimeSlot("");
    fetch(`/api/reservations/slots?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setClosed(data.closed || false);
        setLoadingSlots(false);
      });
  }, [date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, prestation, date, timeSlot }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la reservation");
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-[#050a14] to-[#0d1b2a] px-6">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="mx-auto text-green-400 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-3">Reservation envoyee !</h1>
          <p className="text-white/40 mb-2">
            <strong className="text-white">{prestation}</strong>
          </p>
          <p className="text-white/40 mb-6">
            Le {new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} a {timeSlot}
          </p>
          <p className="text-white/30 text-sm mb-8">
            Nous vous contacterons pour confirmer votre rendez-vous.
          </p>
          <Link
            href="/"
            className="inline-flex px-8 py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase"
          >
            Retour au site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#050a14] via-[#080f1e] to-[#050a14]">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#050a14]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline">Retour</span>
          </Link>
          <span className="text-lg font-extrabold tracking-[0.15em] text-white">
            LA<span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">VOITURE</span>
          </span>
          <div className="w-16" />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red mb-4 block">
            Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Prenez{" "}
            <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
              rendez-vous
            </span>
          </h1>
          <p className="text-white/30 text-sm">
            Choisissez votre prestation, la date et l&apos;heure qui vous conviennent
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s
                    ? "bg-gradient-to-r from-red to-red-dark text-white"
                    : "bg-white/5 text-white/20"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 ${step > s ? "bg-red" : "bg-white/5"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Prestation */}
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-red" />
              Choisissez votre prestation
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {prestations.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPrestation(p);
                    setStep(2);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    prestation === p
                      ? "bg-red/10 border-red/30 text-white"
                      : "bg-white/[0.02] border-white/[0.04] text-white/60 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-sm font-semibold">{p}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest uppercase text-white/50 flex items-center gap-2">
                <Clock size={16} className="text-red" />
                Choisissez la date et l&apos;heure
              </h2>
              <button onClick={() => setStep(1)} className="text-xs text-white/30 hover:text-white flex items-center gap-1">
                <ArrowLeft size={12} /> Retour
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs text-white/30 mb-3">Prestation : <span className="text-white font-semibold">{prestation}</span></p>
              <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
                Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                {dates.map((d) => {
                  const dayDate = new Date(d);
                  const label = dayDate.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
                  return (
                    <button
                      key={d}
                      onClick={() => setDate(d)}
                      className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                        date === d
                          ? "bg-red text-white"
                          : "bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:border-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {date && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-3">
                  Creneau horaire
                </label>
                {loadingSlots ? (
                  <p className="text-white/30 text-sm">Chargement...</p>
                ) : closed ? (
                  <p className="text-white/30 text-sm">Ferme ce jour-la</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((s) => (
                      <button
                        key={s.time}
                        onClick={() => s.available && setTimeSlot(s.time)}
                        disabled={!s.available}
                        className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          timeSlot === s.time
                            ? "bg-red text-white"
                            : s.available
                            ? "bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white hover:border-white/10"
                            : "bg-white/[0.01] border border-white/[0.03] text-white/15 cursor-not-allowed line-through"
                        }`}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {timeSlot && (
              <button
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase"
              >
                Continuer <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* Step 3: Contact form */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest uppercase text-white/50">
                Vos informations
              </h2>
              <button type="button" onClick={() => setStep(2)} className="text-xs text-white/30 hover:text-white flex items-center gap-1">
                <ArrowLeft size={12} /> Retour
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-sm space-y-1">
              <p className="text-white/60">
                <span className="text-white/30">Prestation :</span>{" "}
                <span className="text-white font-semibold">{prestation}</span>
              </p>
              <p className="text-white/60">
                <span className="text-white/30">Date :</span>{" "}
                <span className="text-white font-semibold">
                  {new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </span>
              </p>
              <p className="text-white/60">
                <span className="text-white/30">Heure :</span>{" "}
                <span className="text-white font-semibold">{timeSlot}</span>
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red/10 border border-red/20 text-red text-sm text-center">
                {error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Prenom" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
              <Field label="Nom" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <Field label="Telephone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Marque" value={form.carBrand} onChange={(v) => setForm({ ...form, carBrand: v })} required />
              <Field label="Modele" value={form.carModel} onChange={(v) => setForm({ ...form, carModel: v })} required />
              <Field label="Annee" type="number" value={form.carYear} onChange={(v) => setForm({ ...form, carYear: v })} />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-red/30 focus:ring-1 focus:ring-red/20 resize-none"
                placeholder="Informations supplementaires..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 transition-all disabled:opacity-50"
            >
              {submitting ? "Envoi en cours..." : "Confirmer la reservation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required = false,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
        {label}{required && <span className="text-red ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-red/30 focus:ring-1 focus:ring-red/20 transition-colors"
      />
    </div>
  );
}
