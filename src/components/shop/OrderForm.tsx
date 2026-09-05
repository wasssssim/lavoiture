"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { OrderInfo, CURRENCY } from "@/lib/types";

function formatPrice(price: number): string {
  return price.toLocaleString("fr-DZ");
}

export default function OrderForm() {
  const { items, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<OrderInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    notes: "",
  });

  function update(field: keyof OrderInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            price: i.product.price,
          })),
          customer: form,
          total,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'envoi de la commande");
      }
    } catch {
      setError("Erreur de connexion");
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <CheckCircle size={64} className="mx-auto text-green-400 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-3">
          Commande envoyee !
        </h2>
        <p className="text-white/40 max-w-md mx-auto mb-8">
          Nous avons bien recu votre demande. Vous recevrez un recapitulatif par
          email et nous vous contacterons rapidement pour confirmer le
          rendez-vous.
        </p>
        <a
          href="/boutique"
          className="inline-flex px-8 py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 transition-all"
        >
          Retour a la boutique
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Recapitulatif */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-4">
          Recapitulatif
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-white/70">
                {item.product.name}{" "}
                {item.quantity > 1 && (
                  <span className="text-white/30">x{item.quantity}</span>
                )}
              </span>
              <span className="text-sm font-semibold text-white">
                {formatPrice(item.product.price * item.quantity)} {CURRENCY}
              </span>
            </div>
          ))}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Total</span>
            <span className="text-lg font-black text-red">{formatPrice(total)} {CURRENCY}</span>
          </div>
        </div>
      </div>

      {/* Informations personnelles */}
      <div>
        <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-4">
          Vos informations
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Prenom"
            value={form.firstName}
            onChange={(v) => update("firstName", v)}
            required
          />
          <Input
            label="Nom"
            value={form.lastName}
            onChange={(v) => update("lastName", v)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            required
          />
          <Input
            label="Telephone"
            type="tel"
            value={form.phone}
            onChange={(v) => update("phone", v)}
            required
          />
        </div>
      </div>

      {/* Vehicule */}
      <div>
        <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-4">
          Votre vehicule
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="Marque"
            value={form.carBrand}
            onChange={(v) => update("carBrand", v)}
            required
          />
          <Input
            label="Modele"
            value={form.carModel}
            onChange={(v) => update("carModel", v)}
            required
          />
          <Input
            label="Annee"
            type="number"
            value={form.carYear}
            onChange={(v) => update("carYear", v)}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
          Notes / Remarques
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-red/30 focus:ring-1 focus:ring-red/20 transition-colors resize-none"
          placeholder="Informations supplementaires, couleur du vehicule, etc."
        />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red/10 border border-red/20 text-red text-sm text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 hover:-translate-y-0.5 transition-all disabled:opacity-50"
      >
        <Send size={16} />
        {submitting ? "Envoi en cours..." : "Envoyer la commande"}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-red/30 focus:ring-1 focus:ring-red/20 transition-colors"
      />
    </div>
  );
}
