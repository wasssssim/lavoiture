"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-[#050a14] to-[#0d1b2a] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-red/10 border border-red/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-red" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            Administration
          </h1>
          <p className="text-sm text-white/30 mt-1">LAVOITURE</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red/10 border border-red/20 text-red text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-red/30 focus:ring-1 focus:ring-red/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-red/30 focus:ring-1 focus:ring-red/20 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-red to-red-dark rounded-full text-white text-sm font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-red/25 transition-all disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
