import { cases, services } from "@/data/landing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TelegramCTA } from "./telegram-cta";

export function BusinessBlock({ hidden }: { hidden: boolean }) {
  return (
    <section
      id="business"
      hidden={hidden}
      aria-labelledby="business-title"
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">Для бизнеса</span>
          <h2 id="business-title" className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
            Наводим порядок в деньгах — <span className="italic gold-text">без хаоса и волшебства.</span>
          </h2>
          <p className="mt-4 text-foreground/75">
            Работаю с собственниками и первыми лицами как внешний CFO: собираю управленческий учёт, строю модель, ставлю бюджет и беру ответственность за результат.
          </p>
        </div>

        <div id="cases" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl sm:text-3xl">Кейсы</h3>
            <span className="text-xs text-muted-foreground">Ситуация → действие → результат</span>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {cases.map((c) => (
              <article
                key={c.tag}
                className="group relative flex flex-col rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:emerald-glow"
              >
                <span className="inline-flex w-fit rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] px-2.5 py-1 text-[11px] uppercase tracking-wider text-foreground/75">
                  {c.tag}
                </span>
                <p className="mt-4 text-sm text-foreground/70">
                  <span className="text-[color:var(--gold)]">Ситуация. </span>
                  {c.situation}
                </p>
                <p className="mt-3 text-sm text-foreground/80">
                  <span className="text-[color:var(--gold)]">Действие. </span>
                  {c.action}
                </p>
                <p className="mt-3 text-sm font-medium text-foreground">
                  <span className="text-[color:var(--gold)]">Результат. </span>
                  {c.result}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl">Услуги</h3>
            <p className="mt-3 text-foreground/70">
              Шесть направлений, из которых собираем работу под ваш этап. Начинаем с диагностики.
            </p>
            <div className="mt-6">
              <TelegramCTA>Обсудить задачу</TelegramCTA>
            </div>
          </div>
          <div className="rounded-2xl glass p-2">
            <Accordion type="single" collapsible className="w-full">
              {services.map((s, i) => (
                <AccordionItem key={s.title} value={`i-${i}`} className="border-b border-[color-mix(in_oklab,var(--gold)_15%,transparent)] last:border-0">
                  <AccordionTrigger className="px-4 text-left text-base hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] font-display text-xs gold-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-foreground/70">
                    {s.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
