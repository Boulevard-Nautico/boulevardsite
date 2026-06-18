import { whatsappLink } from "@/lib/whatsapp";
import { site, type Tour } from "@/content/site";
import Gallery from "./Gallery";
import WhatsappIcon from "./WhatsappIcon";

export default function TourCard({ tour }: { tour: Tour }) {
  const href = whatsappLink(
    site.contact.whatsapp,
    `Desejo reservar o passeio: ${tour.title}`,
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-[4px] border border-black/[0.03] bg-white shadow-soft transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(10,25,47,0.08)]">
      <div className="relative h-[250px] overflow-hidden bg-navy max-md:h-[230px]">
        <Gallery images={tour.images} alt={tour.title} />
        {tour.tag && (
          <div className="absolute left-5 top-5 z-[4] bg-navy px-4 py-1.5 text-[0.7rem] uppercase tracking-[2px] text-gold">
            {tour.tag}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 py-8">
        <h3 className="mb-4 text-[1.4rem]">{tour.title}</h3>
        <p className="mb-6 flex-1 text-[0.95rem]">{tour.description}</p>

        <div className="flex items-end justify-between border-t border-black/5 pt-6 max-md:flex-col max-md:items-start max-md:gap-4">
          <div className="flex flex-col">
            <span className="mb-0.5 text-[0.7rem] uppercase tracking-[1px] text-ink-soft">
              Exclusivo por
            </span>
            <span className="font-title text-[1.8rem] leading-none text-navy">
              R$ {tour.price}
            </span>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-navy px-5 py-2.5 text-[0.8rem] uppercase tracking-[1px] text-white transition-all duration-[400ms] hover:bg-gold hover:text-navy max-md:w-full max-md:justify-center"
          >
            <WhatsappIcon className="h-4 w-4" /> Reservar
          </a>
        </div>
      </div>
    </article>
  );
}
