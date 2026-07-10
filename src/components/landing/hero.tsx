import { Check, Sparkles } from "lucide-react";
import { useAudience } from "./audience";
import { HeroBackground } from "./hero-background";
import { TelegramCTA } from "./telegram-cta";
import { audienceCopy } from "@/data/landing";
import heroAsset from "@/assets/natalia-hero.png.asset.json";
import { cn } from "@/lib/utils";

export function Hero() {
  const { audience, setAudience } = useAudience();
  const copy = audienceCopy[audience];

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 lg:pt-32">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-28">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-foreground/80">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" aria-hidden />
            {copy.kicker}
          </div>

          <div
            role="tablist"
            aria-label="Аудитория"
            className="mt-6 inline-flex rounded-full glass p-1 text-sm"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                setAudience(audience === "business" ? "finance" : "business");
              }
            }}
          >
            {(["business", "finance"] as const).map((a) => (
              <button
                key={a}
                role="tab"
                aria-selected={audience === a}
                onClick={() => setAudience(a)}
                className={cn(
                  "rounded-full px-4 py-2 transition-all",
                  audience === a
                    ? "bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold)] text-[color:var(--primary-foreground)] shadow"
                    : "text-foreground/75 hover:text-foreground",
                )}
              >
                {a === "business" ? "Бизнесу" : "Финансистам"}
              </button>
            ))}
          </div>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {audience === "business" ? (
              <>
                Финансы бизнеса —<br />
                <span className="italic gold-text">взросло, спокойно, в цифрах.</span>
              </>
            ) : (
              <>
                Из финансиста —<br />
                <span className="italic gold-text">в финансового директора.</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80">
            {copy.subtitle}
          </p>

          <ul className="mt-7 space-y-3">
            {copy.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-foreground/85">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] text-[color:var(--gold)]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <TelegramCTA size="lg">{copy.cta}</TelegramCTA>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm text-foreground/80 transition-colors hover:text-[color:var(--gold)]"
            >
              Смотреть кейсы →
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
          <div className="relative aspect-[4/5] w-full">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[36px] opacity-70 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 120deg, color-mix(in oklab, var(--gold) 30%, transparent), color-mix(in oklab, var(--emerald) 40%, transparent), color-mix(in oklab, var(--gold) 30%, transparent))",
              }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-[28px] glass emerald-glow animate-float-slow">
              <img
                src={heroAsset.url}
                alt="Наталья Самусенко — финансовый директор и наставник"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--background) 60%, transparent))",
                }}
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl glass-2 px-4 py-3 text-xs">
                <div>
                  <div className="font-medium text-foreground">Наталья Самусенко</div>
                  <div className="text-muted-foreground">CFO · наставник финансистов</div>
                </div>
                <span className="rounded-full border border-[color-mix(in_oklab,var(--gold)_50%,transparent)] px-2 py-0.5 gold-text">
                  17+ лет
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
