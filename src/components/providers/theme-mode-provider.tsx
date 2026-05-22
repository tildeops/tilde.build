"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Mode = "light" | "dark";

type Ctx = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
};

const ThemeModeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "tilde:mode";

function readInitial(): Mode {
  if (typeof document === "undefined") return "light";
  const fromDom = document.documentElement.dataset.mode;
  if (fromDom === "light" || fromDom === "dark") return fromDom;
  return "light";
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => readInitial());

  useEffect(() => {
    setModeState(readInitial());
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    document.documentElement.dataset.mode = m;
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return ctx;
}

/**
 * Inline script that runs before paint to set <html data-mode>.
 * Render this inside <head> as a <script dangerouslySetInnerHTML>.
 */
export const themeModeInitScript = `
(function(){try{
  var k='${STORAGE_KEY}';
  var s=localStorage.getItem(k);
  var m=(s==='dark'||s==='light')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-mode',m);
}catch(e){document.documentElement.setAttribute('data-mode','light');}})();
`.trim();
