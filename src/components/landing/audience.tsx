import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Audience } from "@/data/landing";

type Ctx = { audience: Audience; setAudience: (a: Audience) => void };
const AudienceCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "ns-audience";

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("business");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const initial: Audience =
      hash === "finance" || hash === "business"
        ? hash
        : ((typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as Audience)) || "business");
    setAudienceState(initial === "finance" ? "finance" : "business");

    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "business" || h === "finance") setAudienceState(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a);
    try {
      localStorage.setItem(STORAGE_KEY, a);
      history.replaceState(null, "", `#${a}`);
    } catch {}
  }, []);

  return <AudienceCtx.Provider value={{ audience, setAudience }}>{children}</AudienceCtx.Provider>;
}

export function useAudience() {
  const ctx = useContext(AudienceCtx);
  if (!ctx) throw new Error("useAudience must be used inside AudienceProvider");
  return ctx;
}
