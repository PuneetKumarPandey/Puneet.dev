"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";
import { EASE, DUR } from "@/config/animations";

interface Props {
  children: ReactNode;
}

/**
 * AUDIT FIX: Removed y-transform — it fought Hero's own entry sequence.
 * Now only fades — imperceptible but prevents flash of unstyled content.
 */
export default function PageTransition({ children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DUR.base, ease: EASE.smooth }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
