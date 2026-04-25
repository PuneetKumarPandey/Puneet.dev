// ── Site ──────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

// ── Cursor ────────────────────────────────────────────────────
export type CursorVariant =
  | "default"
  | "hover"
  | "magnetic"
  | "text"
  | "hidden";

// ── Sections ──────────────────────────────────────────────────
export interface SectionProps {
  className?: string;
}

// ── Animation ─────────────────────────────────────────────────
export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}
