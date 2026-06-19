import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import WhatsappIcon from "./WhatsappIcon";
import { site } from "@/content/site";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact, brand } = site;

  return (
    <footer className="bg-navy pb-[30px] pt-20 text-white">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-[60px] grid grid-cols-[2fr_1fr_1fr] gap-[60px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:text-center">
          {/* Marca */}
          <div>
            <Image
              src={brand.logo}
              alt={brand.name}
              className="h-auto w-[150px] max-md:mx-auto"
            />
            <p className="mt-5 max-w-[350px] text-[0.95rem] text-white/60 max-md:mx-auto">
              {contact.footerDescription}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="mb-6 font-title text-[1.2rem] text-gold">Navegação</h3>
            <ul className="list-none">
              <li className="mb-3">
                <a
                  href="#signature"
                  className="text-[0.9rem] uppercase tracking-[1px] text-white/70 transition-all hover:text-gold"
                >
                  Passeios
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#relatos"
                  className="text-[0.9rem] uppercase tracking-[1px] text-white/70 transition-all hover:text-gold"
                >
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-6 font-title text-[1.2rem] text-gold">
              Concierge Desk
            </h3>
            <a
              href={whatsappLink(contact.whatsapp, DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Falar no WhatsApp ${contact.whatsappDisplay}`}
              className="mb-3 flex items-center gap-3 text-[0.95rem] text-white/70 transition-all hover:text-gold max-md:justify-center"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0 text-gold" />
              {contact.whatsappDisplay}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir Instagram ${contact.instagramHandle}`}
              className="mb-4 flex items-center gap-3 text-[0.95rem] text-white/70 transition-all hover:text-gold max-md:justify-center"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-gold" />
              {contact.instagramHandle}
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label={`Enviar email para ${contact.email}`}
              className="mb-4 flex items-center gap-3 text-[0.95rem] text-white/70 transition-all hover:text-gold max-md:justify-center"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              {contact.email}
            </a>
            <p className="mb-4 flex items-center gap-3 text-[0.95rem] text-white/70 max-md:justify-center">
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              {contact.location}
            </p>
          </div>
        </div>

        <div className="flex justify-between border-t border-white/10 pt-[30px] text-[0.8rem] uppercase tracking-[1px] text-white/50 max-md:flex-col max-md:items-center max-md:gap-4">
          <p className="text-white/50">
            &copy; {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p className="text-white/50">DIGITHREE</p>
        </div>
      </div>
    </footer>
  );
}
