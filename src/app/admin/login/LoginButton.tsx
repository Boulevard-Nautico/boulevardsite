"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    setLoading(false);

    if (result?.ok) {
      window.location.href = result.url ?? "/admin";
      return;
    }

    setError("E-mail ou senha invalidos.");
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm text-ink">
          <span className="font-semibold text-navy">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="min-h-11 border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm text-ink">
          <span className="font-semibold text-navy">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="min-h-11 border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-gold"
          />
        </label>
        {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-navy px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-ink-soft">
        <span className="h-px flex-1 bg-black/10" />
        ou
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="inline-flex min-h-11 items-center justify-center gap-2 border border-navy px-5 text-sm font-semibold uppercase tracking-[0.08em] text-navy transition hover:bg-navy hover:text-white"
      >
        <LogIn className="h-4 w-4" />
        Entrar com Google
      </button>
    </div>
  );
}
