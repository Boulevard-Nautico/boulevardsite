import Link from "next/link";
import type { ReactNode } from "react";
import { requireAdminPage } from "@/lib/admin-auth";
import SignOutButton from "../SignOutButton";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdminPage();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4">
          <div>
            <Link href="/admin" className="font-title text-xl text-white">
              Boulevard Admin
            </Link>
            <p className="text-xs text-white/55">{session.user?.email}</p>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition hover:text-gold sm:inline"
            >
              Ver site
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
