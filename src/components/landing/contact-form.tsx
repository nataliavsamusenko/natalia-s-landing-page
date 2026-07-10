import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PrivacyDialog } from "./privacy-dialog";
import { TelegramCTA } from "./telegram-cta";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Некорректный e-mail"),
  message: z.string().min(10, "Опишите задачу подробнее (мин. 10 символов)"),
  consent: z.literal(true, { errorMap: () => ({ message: "Нужно согласие на обработку данных" }) }),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", consent: false as unknown as true },
  });
  const consent = watch("consent");

  const onSubmit = async (_data: FormData) => {
    // TODO: подключить backend / Formspree / антиспам
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    toast.success("Спасибо! Скоро свяжусь.");
    reset();
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid gap-10 rounded-3xl glass p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">Связаться</span>
            <h2 id="contact-title" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Расскажите о задаче — <span className="italic gold-text">отвечу лично.</span>
            </h2>
            <p className="mt-4 text-foreground/75">
              Самый быстрый способ — Telegram. Или напишите здесь: прочту каждое сообщение и вернусь с ответом в течение рабочего дня.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <TelegramCTA size="lg">Написать в Telegram</TelegramCTA>
            </div>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl glass-2 p-10 text-center">
              <CheckCircle2 className="h-10 w-10 text-[color:var(--gold)]" />
              <div className="font-display text-2xl">Спасибо!</div>
              <p className="text-sm text-muted-foreground">
                Сообщение получено. Отвечу лично в течение рабочего дня.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm text-[color:var(--gold)] hover:underline"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Имя
                </Label>
                <Input id="name" placeholder="Как к вам обращаться" {...register("name")} className="mt-2 h-12" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                  E-mail
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className="mt-2 h-12" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Сообщение
                </Label>
                <Textarea id="message" rows={4} placeholder="Коротко о задаче / вопросе" {...register("message")} className="mt-2" />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={!!consent}
                  onCheckedChange={(v) => setValue("consent", v === true ? (true as const) : (false as unknown as true), { shouldValidate: true })}
                  className="mt-0.5"
                />
                <Label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
                  Согласен(а) на обработку персональных данных. Ознакомиться с{" "}
                  <PrivacyDialog>
                    <button type="button" className="text-[color:var(--gold)] underline-offset-2 hover:underline">
                      политикой
                    </button>
                  </PrivacyDialog>
                  .
                </Label>
              </div>
              {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold)] px-6 py-3.5 text-sm font-medium text-[color:var(--primary-foreground)] gold-ring transition-all hover:brightness-110 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Отправляем…" : "Отправить сообщение"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
