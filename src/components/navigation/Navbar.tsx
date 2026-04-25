"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollTo } from "@/lib/lenis";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCursorContext } from "@/context/CursorContext";
import { SITE_CONFIG } from "@/config/site";
import clsx from "clsx";

// ── Magnetic Nav Link ──────────────────────────────────────────
function NavLink({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>({
    strength: 0.35,
  });
  const { setVariant } = useCursorContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    scrollTo(`#${id}`, { offset: -80, duration: 1.6 });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave();
        setVariant("default");
      }}
      onMouseEnter={() => setVariant("hover")}
      className={clsx(
        "relative font-body text-xs tracking-widest uppercase transition-colors duration-300",
        isActive ? "text-neon" : "text-ghost hover:text-ash",
      )}
    >
      {label}

      <motion.span
        className="absolute -bottom-1 left-0 h-px w-full bg-neon"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </a>
  );
}

// ── Navbar ─────────────────────────────────────────────────────
export default function Navbar() {
  const activeSection = useActiveSection();
  const { setVariant } = useCursorContext();
  const { scrollY } = useScroll();

  // Glass intensity increases on scroll
  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.06]);

  useEffect(() => {
    return scrollY.onChange(() => undefined);
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-overlay"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glass background */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: backdropOpacity }}
      >
        <div className="absolute inset-0 bg-void/80 backdrop-blur-xl" />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-white"
          style={{ opacity: borderOpacity }}
        />
      </motion.div>

      <nav className="container relative flex items-center justify-between py-5">
        {/* ── Logo / Wordmark ── */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          className="font-display text-sm tracking-tight text-ash"
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={() => setVariant("default")}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-neon">P</span>uneet
          <span className="mx-1.5 text-whisper">/</span>
          <span className="text-ghost text-xs font-body tracking-widest uppercase">
            AI Systems
          </span>
        </motion.a>

        {/* ── Nav Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {SITE_CONFIG.nav.map(({ label, href }) => (
            <li key={href}>
              <NavLink
                label={label}
                href={href}
                isActive={activeSection === href.replace("#", "")}
              />
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#contact");
          }}
          className={clsx(
            "hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase",
            "px-5 py-2.5 rounded-full border border-neon/30 text-neon",
            "transition-all duration-300",
            "hover:bg-neon/10 hover:border-neon hover:shadow-neon",
          )}
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={() => setVariant("default")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
          Available
        </motion.a>

        {/* ── Mobile hamburger (minimal) ── */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={() => setVariant("default")}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className={clsx(
                "block h-px bg-ash transition-all duration-300",
                i === 0 ? "w-6" : "w-4",
              )}
            />
          ))}
        </button>
      </nav>
    </motion.header>
  );
}
