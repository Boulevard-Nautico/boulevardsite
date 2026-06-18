import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ReviewCard from "./ReviewCard";
import { site } from "@/content/site";

export default function Depoimentos() {
  return (
    <section id="relatos" className="bg-white py-[100px] max-md:py-[60px]">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal>
          <SectionHeader title="Relatos de Excelência" />
        </Reveal>

        <div className="grid gap-[30px] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[480px]:grid-cols-1">
          {site.reviews.map((review, i) => (
            <Reveal key={i}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
