import type { Metadata } from "next";
import LoginButton from "./LoginButton";

export const metadata: Metadata = {
  title: "Admin | Boulevard Nautico",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-[420px] border border-black/10 bg-white p-8 shadow-soft">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Boulevard Nautico
        </p>
        <h1 className="mb-4 text-3xl text-navy">Painel admin</h1>
        <p className="mb-8 text-sm leading-6 text-ink-soft">
          Entre com e-mail e senha ou use Google. O e-mail precisa estar em
          ADMIN_EMAILS ou na tabela admin_users.
        </p>
        <LoginButton />
      </div>
    </main>
  );
}
