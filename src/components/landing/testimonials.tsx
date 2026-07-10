import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/landing";
import { useAudience } from "./audience";

export function Testimonials() {
  const { audience } = useAudience();
  const list = testimonials[audience];
  const railRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">
              Отзывы {audience === "business" ? "собственников" : "финансистов"}
            </span>
            <h2 id="testimonials-title" className="mt-2 font-display text-3xl sm:text-4xl">
              Что говорят о работе
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              onClick={() => scroll(-1)}
              className="grid h-11 w-11 place-items-center rounded-full hairline hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Следующий отзыв"
              onClick={() => scroll(1)}
              className="grid h-11 w-11 place-items-center rounded-full hairline hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {list.map((t) => (
            <figure
              key={t.author}
              className="relative min-w-[85%] snap-start rounded-2xl glass p-6 sm:min-w-[420px] sm:p-7"
            >
              <Quote className="h-6 w-6 text-[color:var(--gold)]" aria-hidden />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-5 border-t border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pt-4 text-sm">
                <div className="font-medium text-foreground">{t.author}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
