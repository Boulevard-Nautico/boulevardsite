"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blurPlaceholderProps } from "@/lib/images";
import type { SiteImage } from "@/types/site";

interface GalleryProps {
  images: SiteImage[];
  alt: string;
}

export default function Gallery({ images, alt }: GalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const single = images.length <= 1;

  if (images.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-navy text-sm uppercase tracking-[0.08em] text-white/60">
        Imagem indisponivel
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden" ref={single ? undefined : emblaRef}>
      <div className="flex h-full">
        {images.map((img, i) => (
          <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
            <Image
              src={img}
              alt={`${alt} — foto ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              {...blurPlaceholderProps(img)}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>

      {!single && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={scrollPrev}
            className="absolute left-3.5 top-1/2 z-[5] flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-navy/70 text-white opacity-100 backdrop-blur-sm transition-all duration-[400ms] hover:border-gold hover:bg-gold hover:text-navy md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={scrollNext}
            className="absolute right-3.5 top-1/2 z-[5] flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-navy/70 text-white opacity-100 backdrop-blur-sm transition-all duration-[400ms] hover:border-gold hover:bg-gold hover:text-navy md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute inset-x-0 bottom-3 z-[5] flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para foto ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === selected ? "bg-gold" : "bg-white/45"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
