import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { TelegramCTA } from "./telegram-cta";
import { cn } from "@/lib/utils";

const nav = [
  { id: "business", label: "Бизнесу" },
  { id: "finance", label: "Финансистам" },
  { id: "cases", label: "Кейсы" },
  { id: "testimonials", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "backdrop-blur-xl bg-[color-mix(in_oklab,var(--background)_75%,transparent)] border-b border-[color-mix(in_oklab,var(--gold)_18%,transparent)]" : "",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] font-display text-base gold-text">
            НС
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium">Наталья Самусенко</span>
            <span className="text-[11px] text-muted-foreground">CFO · наставник · консультант</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-foreground/75 transition-colors hover:text-[color:var(--gold)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <TelegramCTA size="sm">Написать</TelegramCTA>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-full hairline"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color-mix(in_oklab,var(--gold)_18%,transparent)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-foreground/85 hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
              >
                {n.label}
              </a>
            ))}
            <div className="px-3 pt-3">
              <TelegramCTA size="md" className="w-full justify-center">
                Написать в Telegram
              </TelegramCTA>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
