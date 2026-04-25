"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CursorVariant } from "@/hooks/useCursor";

interface CursorContextValue {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  setCursorText: (text: string) => void;
  cursorText: string;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>("default");
  const [cursorText, setCursorTextState] = useState("");

  const setVariant = useCallback((v: CursorVariant) => {
    setVariantState(v);
  }, []);

  const setCursorText = useCallback((text: string) => {
    setCursorTextState(text);
  }, []);

  return (
    <CursorContext.Provider
      value={{ variant, setVariant, cursorText, setCursorText }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx)
    throw new Error("useCursorContext must be used inside CursorProvider");
  return ctx;
}
