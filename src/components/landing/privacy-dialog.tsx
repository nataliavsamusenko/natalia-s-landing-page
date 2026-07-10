import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { ReactNode } from "react";

export function PrivacyDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Согласие на обработку персональных данных</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-3 overflow-y-auto text-sm text-foreground/80">
          <p>
            Отправляя форму, вы даёте согласие на обработку персональных данных (имя, e-mail, содержание сообщения) с целью связи с вами по вашему обращению.
          </p>
          <p>
            Данные не передаются третьим лицам и хранятся только до завершения коммуникации. Вы можете в любой момент отозвать согласие, написав на указанную в футере почту.
          </p>
          <p className="text-muted-foreground">
            TODO: заменить на юридически выверенную политику ПДн.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
