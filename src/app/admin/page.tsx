"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Package,
  ShoppingBag,
  Calendar,
  LogOut,
  RefreshCw,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { CURRENCY, categoryLabels, type Category } from "@/lib/types";

type Tab = "produits" | "commandes" | "reservations";

function formatPrice(price: number) {
  return price.toLocaleString("fr-DZ");
}

const statusColors: Record<string, string> = {
  en_attente: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirme: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  termine: "bg-green-500/20 text-green-400 border-green-500/30",
  annule: "bg-red/20 text-red border-red/30",
};

const statusLabels: Record<string, string> = {
  en_attente: "En attente",
  confirme: "Confirme",
  termine: "Termine",
  annule: "Annule",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("produits");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#050a14]">
        <div className="text-white/30">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#050a14] to-[#080f1e]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#050a14]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold tracking-[0.15em] text-white">
              LA
              <span className="bg-gradient-to-r from-red to-red-light bg-clip-text text-transparent">
                VOITURE
              </span>
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">{session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/40 border border-white/10 hover:text-white hover:border-white/20 transition-colors"
            >
              <LogOut size={14} />
              Deconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-2 mb-8">
          {([
            { id: "produits", icon: Package, label: "Produits" },
            { id: "commandes", icon: ShoppingBag, label: "Commandes" },
            { id: "reservations", icon: Calendar, label: "Reservations" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                tab === t.id
                  ? "bg-gradient-to-r from-red to-red-dark text-white shadow-lg shadow-red/20"
                  : "bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/70"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "produits" && <ProductsTab />}
        {tab === "commandes" && <OrdersTab />}
        {tab === "reservations" && <ReservationsTab />}
      </div>
    </div>
  );
}

// ============ PRODUCTS TAB ============

function ProductsTab() {
  const [products, setProducts] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleActive(id: string, active: boolean) {
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active: !active }),
    });
    load();
  }

  async function updateStock(id: string, stock: number) {
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stock }),
    });
    load();
  }

  async function updatePrice(id: string, price: number) {
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, price }),
    });
    load();
  }

  if (loading) return <div className="text-white/30 text-sm">Chargement...</div>;

  return (
    <div className="space-y-3 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">{products.length} produits</h2>
        <button onClick={load} className="p-2 text-white/30 hover:text-white transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] font-bold tracking-wider uppercase text-white/30 border-b border-white/5">
              <th className="pb-3 pr-4">Produit</th>
              <th className="pb-3 pr-4">Categorie</th>
              <th className="pb-3 pr-4">Prix ({CURRENCY})</th>
              <th className="pb-3 pr-4">Stock</th>
              <th className="pb-3">Actif</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id as string} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="py-3 pr-4">
                  <span className="font-semibold text-white">{p.name as string}</span>
                </td>
                <td className="py-3 pr-4 text-white/40 text-xs">
                  {categoryLabels[p.category as Category] || (p.category as string)}
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="number"
                    defaultValue={p.price as number}
                    onBlur={(e) => updatePrice(p.id as string, Number(e.target.value))}
                    className="w-24 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-red/30"
                  />
                </td>
                <td className="py-3 pr-4">
                  {(p.stock as number) === -1 ? (
                    <span className="text-white/20 text-xs">Illimite</span>
                  ) : (
                    <input
                      type="number"
                      defaultValue={p.stock as number}
                      onBlur={(e) => updateStock(p.id as string, Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-red/30"
                    />
                  )}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => toggleActive(p.id as string, p.active as boolean)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      (p.active as boolean) ? "bg-green-500" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        (p.active as boolean) ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ ORDERS TAB ============

function OrdersTab() {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    if (res.ok) setOrders(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  if (loading) return <div className="text-white/30 text-sm">Chargement...</div>;

  if (orders.length === 0) {
    return <div className="text-center text-white/30 py-16">Aucune commande</div>;
  }

  return (
    <div className="space-y-3 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">{orders.length} commandes</h2>
        <button onClick={load} className="p-2 text-white/30 hover:text-white transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      {orders.map((o) => (
        <div key={o.id as string} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold text-white">
                {o.firstName as string} {o.lastName as string}
              </span>
              <span className="text-white/30 text-xs ml-3">
                {new Date(o.createdAt as string).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-red">
                {formatPrice(o.total as number)} {CURRENCY}
              </span>
              <button
                onClick={() => setDetail(o)}
                className="p-1.5 text-white/30 hover:text-white transition-colors"
              >
                <Eye size={14} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">{o.phone as string}</span>
            <span className="text-xs text-white/20">|</span>
            <span className="text-xs text-white/30">
              {o.carBrand as string} {o.carModel as string}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            {["en_attente", "confirme", "termine", "annule"].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(o.id as string, s)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all ${
                  (o.status as string) === s
                    ? statusColors[s]
                    : "border-white/5 text-white/20 hover:text-white/40"
                }`}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="w-full max-w-md bg-[#0a1120] border border-white/5 rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Detail commande</h3>
              <button onClick={() => setDetail(null)} className="text-white/30 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-white/60">
                <span className="text-white/30">Client :</span>{" "}
                {detail.firstName as string} {detail.lastName as string}
              </p>
              <p className="text-white/60">
                <span className="text-white/30">Email :</span> {detail.email as string}
              </p>
              <p className="text-white/60">
                <span className="text-white/30">Tel :</span> {detail.phone as string}
              </p>
              <p className="text-white/60">
                <span className="text-white/30">Vehicule :</span>{" "}
                {detail.carBrand as string} {detail.carModel as string} {detail.carYear as string}
              </p>
              {(detail.notes as string) && (
                <p className="text-white/60">
                  <span className="text-white/30">Notes :</span> {detail.notes as string}
                </p>
              )}
              <div className="pt-3 border-t border-white/5">
                {((detail.items as Record<string, unknown>[]) || []).map((item) => (
                  <div key={item.id as string} className="flex justify-between py-1">
                    <span className="text-white/60">
                      {(item.product as Record<string, unknown>)?.name as string}{" "}
                      <span className="text-white/30">x{item.quantity as number}</span>
                    </span>
                    <span className="text-white font-semibold">
                      {formatPrice((item.price as number) * (item.quantity as number))} {CURRENCY}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-white/5 mt-2">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-black text-red">
                    {formatPrice(detail.total as number)} {CURRENCY}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ RESERVATIONS TAB ============

function ReservationsTab() {
  const [reservations, setReservations] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/reservations");
    if (res.ok) setReservations(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/reservations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function deleteRes(id: string) {
    await fetch("/api/admin/reservations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "annule" }),
    });
    load();
  }

  if (loading) return <div className="text-white/30 text-sm">Chargement...</div>;

  if (reservations.length === 0) {
    return <div className="text-center text-white/30 py-16">Aucune reservation</div>;
  }

  return (
    <div className="space-y-3 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">{reservations.length} reservations</h2>
        <button onClick={load} className="p-2 text-white/30 hover:text-white transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      {reservations.map((r) => (
        <div key={r.id as string} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold text-white">
                {r.firstName as string} {r.lastName as string}
              </span>
              <span className={`ml-3 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${statusColors[r.status as string]}`}>
                {statusLabels[r.status as string]}
              </span>
            </div>
            <button
              onClick={() => deleteRes(r.id as string)}
              className="p-1.5 text-white/20 hover:text-red transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-2">
            <div>
              <span className="text-white/30">Date</span>
              <p className="text-white font-semibold">
                {new Date(r.date as string).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div>
              <span className="text-white/30">Heure</span>
              <p className="text-white font-semibold">{r.timeSlot as string}</p>
            </div>
            <div>
              <span className="text-white/30">Prestation</span>
              <p className="text-white font-semibold">{r.prestation as string}</p>
            </div>
            <div>
              <span className="text-white/30">Vehicule</span>
              <p className="text-white font-semibold">
                {r.carBrand as string} {r.carModel as string}
              </p>
            </div>
          </div>
          <div className="text-xs text-white/30 mt-2">
            {r.phone as string} | {r.email as string}
          </div>
          <div className="flex items-center gap-2 mt-3">
            {["en_attente", "confirme", "annule"].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(r.id as string, s)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all ${
                  (r.status as string) === s
                    ? statusColors[s]
                    : "border-white/5 text-white/20 hover:text-white/40"
                }`}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
