import { useState } from "react";
import { programs, tools } from "@/data/landing";
import { TelegramCTA } from "./telegram-cta";
import { cn } from "@/lib/utils";

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="group relative h-40 w-full [perspective:1000px] focus-visible:outline-none"
    >
      <span
        className={cn(
          "absolute inset-0 rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <span className="absolute inset-0 flex items-center justify-center rounded-2xl glass p-4 text-center font-display text-xl [backface-visibility:hidden] group-focus-visible:ring-2 group-focus-visible:ring-[color:var(--ring)]">
          <span className="gold-text">{front}</span>
        </span>
        <span className="absolute inset-0 flex items-center justify-center rounded-2xl glass-2 p-4 text-center text-sm text-foreground/85 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </span>
      </span>
    </button>
  );
}

export function FinanceBlock({ hidden }: { hidden: boolean }) {
  return (
    <section
      id="finance"
      hidden={hidden}
      aria-labelledby="finance-title"
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">Для финансистов</span>
          <h2 id="finance-title" className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
            Инструменты, мышление и <span className="italic gold-text">уверенность CFO.</span>
          </h2>
          <p className="mt-4 text-foreground/75">
            Помогаю специалистам вырасти в финансовых директоров: не «пересказ учебников», а рабочая практика, которую я использую в проектах каждый день.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl">Инструменты, с которыми работаем</h3>
          <p className="mt-1 text-sm text-muted-foreground">Наведите или коснитесь карточки, чтобы увидеть суть.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {tools.map((t) => (
              <FlipCard key={t.front} front={t.front} back={t.back} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-2xl">Форматы работы</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {programs.map((p) => (
              <article
                key={p.title}
                className="flex flex-col rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:emerald-glow"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{p.duration}</span>
                  <span>{p.price}</span>
                </div>
                <h4 className="mt-3 font-display text-xl">{p.title}</h4>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <TelegramCTA variant="outline" size="sm" className="w-full justify-center">
                    Узнать подробнее
                  </TelegramCTA>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
