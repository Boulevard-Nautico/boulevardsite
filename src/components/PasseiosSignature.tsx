import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TourCard from "./TourCard";
import { site } from "@/content/site";

export default function PasseiosSignature() {
  return (
    <section id="signature" className="py-[100px] max-md:py-[60px]">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal>
          <SectionHeader
            title="Passeios Signature"
            subtitle="Nossa frota de alto padrão operando nos roteiros mais cobiçados da Costa Verde."
          />
        </Reveal>

        <div className="grid gap-[30px] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[480px]:grid-cols-1">
          {site.tours.map((tour) => (
            <Reveal key={tour.slug}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
