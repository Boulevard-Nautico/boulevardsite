"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, X } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";
import { whatsappLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";
import type { SiteContact } from "@/types/site";

export default function WhatsappWidget({
  brandName,
  contact,
}: {
  brandName: string;
  contact: SiteContact;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const send = () => {
    const text = message.trim() || DEFAULT_WA_MESSAGE;
    window.open(whatsappLink(contact.whatsapp, text), "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  return (
    <>
      {/* Caixa de chat */}
      <div
        className={`fixed bottom-[110px] right-[30px] z-[9999] w-[360px] overflow-hidden rounded-xl bg-white shadow-[0_15px_35px_rgba(10,25,47,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-[480px]:bottom-[90px] max-[480px]:right-5 max-[480px]:w-[calc(100%-40px)] ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-5 opacity-0"
        }`}
        role="dialog"
        aria-label="Atendimento WhatsApp"
        aria-hidden={!open}
      >
        {/* Cabeçalho */}
        <div className="relative flex items-center gap-4 bg-navy p-5">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full border-2 border-gold">
            <Image
              src={contact.conciergeAvatar}
              alt={contact.conciergeName}
              width={50}
              height={50}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-title text-[1.1rem] text-white">
              {contact.conciergeName}
            </h4>
            <p className="flex items-center gap-1.5 text-[0.8rem] text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-wa" />
              Online agora
            </p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 text-white/50 transition-colors hover:text-gold"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo */}
        <div className="min-h-[200px] bg-cream p-5 px-5 py-6">
          <div className="rounded-[0_12px_12px_12px] bg-white p-4 text-[0.95rem] leading-[1.5] text-ink shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <strong className="mb-1.5 block text-[0.85rem] text-gold">
              {brandName}
            </strong>
            Olá! Bem-vindo(a) ao atendimento exclusivo. Como posso ajudar a
            planejar sua experiência em Angra dos Reis hoje?
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex gap-3 border-t border-slate-100 bg-white p-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escreva sua mensagem..."
            autoComplete="off"
            className="flex-1 rounded-full border border-transparent bg-cream px-5 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold/30"
          />
          <button
            type="button"
            aria-label="Enviar mensagem"
            onClick={send}
            className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-navy text-gold transition-all hover:bg-gold hover:text-navy"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Botão flutuante */}
      <button
        type="button"
        aria-label="Falar com o Concierge no WhatsApp"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[30px] right-[30px] z-[9998] flex h-[65px] w-[65px] animate-wa-pulse items-center justify-center rounded-full bg-wa text-white shadow-[0_10px_20px_rgba(37,211,102,0.3)] transition-all hover:scale-105 hover:bg-wa-hover max-[480px]:bottom-5 max-[480px]:right-5 max-[480px]:h-[55px] max-[480px]:w-[55px]"
      >
        <WhatsappIcon className="h-9 w-9" />
      </button>
    </>
  );
}
