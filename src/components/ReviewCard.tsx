import { Quote } from "lucide-react";
import type { Review } from "@/content/site";

export default function ReviewCard({ review }: { review: Review }) {
  const stars = "★".repeat(review.stars) + "☆".repeat(Math.max(0, 5 - review.stars));

  return (
    <div className="relative border-t-[3px] border-gold bg-white p-10 shadow-soft">
      <Quote
        className="absolute right-[30px] top-[30px] fill-gold/15 text-gold/15"
        size={32}
      />
      <div className="mb-5 text-[0.9rem] tracking-[2px] text-gold">{stars}</div>
      <p className="mb-6 text-[1.05rem] italic leading-[1.7] text-ink">
        &ldquo;{review.text}&rdquo;
      </p>
      <h4 className="font-title text-[1.1rem] text-navy">{review.name}</h4>
      <span className="text-[0.75rem] uppercase tracking-[1px] text-ink-soft">
        {review.location}
      </span>
    </div>
  );
}
