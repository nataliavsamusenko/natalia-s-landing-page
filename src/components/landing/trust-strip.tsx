import { metrics, partnerLogos, certificates } from "@/data/landing";

export function TrustStrip() {
  return (
    <section aria-label="Доверие" className="relative border-y border-[color-mix(in_oklab,var(--gold)_15%,transparent)] bg-[color-mix(in_oklab,var(--surface)_50%,transparent)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <div className="font-display text-3xl gold-text sm:text-4xl">{m.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {partnerLogos.map((l) => (
              <span
                key={l}
                className="text-xs uppercase tracking-[0.24em] text-foreground/55"
                title="TODO: заменить на реальный логотип"
              >
                {l}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {certificates.map((c) => (
              <span
                key={c}
                className="rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-widest text-foreground/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
