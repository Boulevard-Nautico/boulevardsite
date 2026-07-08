"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ChevronDown } from "lucide-react";
import { blurPlaceholderProps } from "@/lib/images";
import type { HeroSlide } from "@/types/site";

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <header id="top" className="relative h-screen w-full overflow-hidden bg-[#111]">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative flex h-full min-w-0 flex-[0_0_100%] flex-col items-center justify-center text-center"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                sizes="100vw"
                {...blurPlaceholderProps(slide.image)}
                className="object-cover"
              />
              {/* Overlay escuro para legibilidade */}
              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-[2] max-w-[900px] px-5 text-white">
                {slide.subtitle && (
                  <span className="mb-[15px] inline-block text-base font-semibold uppercase tracking-[3px] text-hero-gold max-md:text-[0.85rem]">
                    {slide.subtitle}
                  </span>
                )}
                <h1 className="mb-[25px] text-[4rem] font-bold leading-[1.1] text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] max-md:text-[2.5rem]">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="mx-auto max-w-[700px] text-[1.25rem] font-light leading-[1.6] text-white max-md:text-[1.05rem]">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === selected ? "scale-110 bg-hero-gold" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll down */}
      <a
        href="#signature"
        aria-label="Rolar para os passeios"
        className="absolute bottom-[30px] left-1/2 z-10 -translate-x-1/2 animate-bounce-down text-white transition-colors hover:text-hero-gold"
      >
        <ChevronDown size={24} />
      </a>
    </header>
  );
}
