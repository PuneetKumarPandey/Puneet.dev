"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/config/animations";

interface Props {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const complete = useCallback(() => {
    setDone(true);
    // Delay slightly so the exit animation is visible
    setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    // AUDIT FIX: Listen for real document readiness
    // Fast connections skip the ramp and exit immediately
    const isReady = document.readyState === "complete";

    if (isReady) {
      setProgress(100);
      const t = setTimeout(complete, 300);
      return () => clearTimeout(t);
    }

    const steps = [
      { target: 30, delay: 80 },
      { target: 60, delay: 320 },
      { target: 82, delay: 620 },
      { target: 100, delay: 950 },
    ];

    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay),
    );

    const exitTimer = setTimeout(complete, 1300);

    const onLoad = () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      setProgress(100);
      setTimeout(complete, 200);
    };

    window.addEventListener("load", onLoad);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [complete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-toast bg-void flex flex-col
                     items-center justify-center gap-0"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: EASE.inOut },
          }}
        >
          <motion.p
            className="font-display text-xl text-ash tracking-tight mb-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5, ease: EASE.out }}
          >
            <span className="text-neon">P</span>uneet Pandey
          </motion.p>

          <div className="w-36 h-px bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon rounded-full origin-left"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>

          <motion.span
            className="mt-4 font-body text-xs text-whisper tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.15 }}
          >
            {String(progress).padStart(3, "0")}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
