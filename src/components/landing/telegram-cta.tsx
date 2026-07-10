import { Send } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/telegram";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

export function TelegramCTA({
  children,
  variant = "primary",
  className,
  size = "md",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  }[size];

  const styles: Record<Variant, string> = {
    primary:
      "bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold)] text-[color:var(--primary-foreground)] gold-ring hover:brightness-110",
    outline:
      "hairline text-foreground hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]",
    ghost: "text-foreground/90 hover:text-[color:var(--gold)]",
  };

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes,
        styles[variant],
        className,
      )}
    >
      <Send className="h-4 w-4" aria-hidden />
      {children}
    </a>
  );
}
