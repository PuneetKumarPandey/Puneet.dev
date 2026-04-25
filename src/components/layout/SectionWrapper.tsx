"use client";

import { type ReactNode } from "react";
import clsx from "clsx";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * AUDIT FIX: Removed Framer opacity animation.
 * Each section's internal components handle their own reveal.
 * SectionWrapper is now purely structural — id anchor + layout shell.
 */
export default function SectionWrapper({ id, children, className }: Props) {
  return (
    <section
      id={id}
      className={clsx("relative w-full overflow-hidden", className)}
    >
      {children}
    </section>
  );
}
