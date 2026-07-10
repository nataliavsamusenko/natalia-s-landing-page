import { CONTACT_EMAIL, TELEGRAM_URL } from "@/lib/telegram";
import { PrivacyDialog } from "./privacy-dialog";

export function Footer() {
  return (
    <footer className="relative border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-lg">Наталья Самусенко</div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Финансовый директор и наставник
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-[color:var(--gold)]"
          >
            Telegram
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground/80 hover:text-[color:var(--gold)]">
            {CONTACT_EMAIL}
          </a>
          <PrivacyDialog>
            <button type="button" className="text-foreground/80 hover:text-[color:var(--gold)]">
              Политика ПДн
            </button>
          </PrivacyDialog>
        </div>
      </div>
    </footer>
  );
}
