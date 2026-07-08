"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="inline-flex h-10 items-center justify-center gap-2 border border-white/15 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 transition hover:border-gold hover:text-gold"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </button>
  );
}
