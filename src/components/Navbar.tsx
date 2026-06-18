"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";

const links = [
  { href: "#signature", label: "Passeios Signature" },
  { href: "#relatos", label: "Depoimentos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-[5%] transition-all duration-[400ms] ${
        scrolled
          ? "bg-navy/95 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] backdrop-blur-md"
          : "border-b border-white/10 py-6"
      }`}
    >
      <a href="#top" onClick={close} className="relative z-[1001] block">
        <Image
          src={site.brand.logo}
          alt={site.brand.name}
          priority
          className="h-auto w-[120px]"
        />
      </a>

      {/* Hambúrguer (mobile) */}
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[1001] flex h-5 w-[30px] flex-col justify-between md:hidden"
      >
        <span
          className={`block h-0.5 w-full bg-gold transition-all duration-[400ms] ${
            open ? "translate-y-[9px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-gold transition-all duration-[400ms] ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-gold transition-all duration-[400ms] ${
            open ? "-translate-y-[9px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Links */}
      <div
        className={`flex items-center gap-10 max-md:fixed max-md:inset-y-0 max-md:h-screen max-md:w-full max-md:flex-col max-md:justify-center max-md:bg-navy max-md:transition-all max-md:duration-[400ms] ${
          open ? "max-md:right-0" : "max-md:-right-full"
        } right-0`}
      >
        <ul className="flex gap-10 max-md:flex-col max-md:items-center max-md:gap-6 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="text-[0.85rem] uppercase tracking-[1.5px] text-white/80 transition-all duration-[400ms] hover:text-gold hover:opacity-100 max-md:text-xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#signature"
          onClick={close}
          className="border border-gold px-6 py-2.5 text-[0.8rem] uppercase tracking-[1px] text-gold transition-all duration-[400ms] hover:bg-gold hover:text-navy"
        >
          Reservar
        </a>
      </div>
    </nav>
  );
}
