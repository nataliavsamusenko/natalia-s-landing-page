import { glossary } from "@/data/landing";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Glossary() {
  return (
    <section aria-label="Словарь терминов" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="rounded-3xl glass p-8 sm:p-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Мини-словарь</h2>
              <p className="mt-1 text-sm text-muted-foreground">Наведите на термин, чтобы увидеть определение.</p>
            </div>
            <span className="text-xs text-muted-foreground">5 базовых понятий</span>
          </div>
          <TooltipProvider delayDuration={100}>
            <div className="mt-6 flex flex-wrap gap-3">
              {glossary.map((g) => (
                <Tooltip key={g.term}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full hairline px-4 py-2 text-sm text-foreground/85 transition-colors hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                    >
                      {g.term}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-sm">
                    {g.def}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}
