"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCursorContext } from "@/context/CursorContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SITE_CONFIG } from "@/config/site";

// ── Social link ────────────────────────────────────────────────
function SocialLink({
  href,
  label,
  index,
}: {
  href: string;
  label: string;
  index: number;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>({
    strength: 0.3,
  });
  const { setVariant } = useCursorContext();

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave();
        setVariant("default");
      }}
      onMouseEnter={() => setVariant("hover")}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.5 + index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group inline-flex items-center gap-2 font-body text-xs
                 tracking-widest uppercase text-ghost
                 hover:text-ash transition-colors duration-300"
    >
      <span
        className="h-px w-0 group-hover:w-5 bg-ash
                   transition-all duration-400 ease-out-expo"
      />
      {label}
    </motion.a>
  );
}

// ── Primary email CTA ──────────────────────────────────────────
function EmailCTA() {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>({
    strength: 0.25,
  });
  const { setVariant } = useCursorContext();

  return (
    <motion.a
      ref={ref}
      href={`mailto:${SITE_CONFIG.email}`}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave();
        setVariant("default");
      }}
      onMouseEnter={() => setVariant("magnetic")}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.9 }}
      className="group relative inline-block"
    >
      <span
        className="font-display tracking-tight text-white leading-none
                   transition-colors duration-300 group-hover:text-neon"
        style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
      >
        {SITE_CONFIG.email}
      </span>

      {/* Underline that draws in on hover */}
      <span
        className="absolute -bottom-2 left-0 h-px w-0 bg-neon
                   group-hover:w-full transition-all duration-500 ease-out-expo"
      />
    </motion.a>
  );
}

// ── Contact section ────────────────────────────────────────────
export default function Contact() {
  const headerRef = useScrollReveal<HTMLDivElement>({
    selector: ".contact-item",
    from: { y: 32, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.95 },
    stagger: 0.13,
    start: "top 82%",
  });

  return (
    <SectionWrapper id="contact" className="bg-void">
      <div className="container py-section">
        <div ref={headerRef}>
          {/* ── Eyebrow ── */}
          <div className="contact-item flex items-center gap-4 mb-10">
            <span className="h-px w-8 bg-neon" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-neon">
              Contact
            </span>
          </div>

          {/* ── Closing statement ── */}
          <div className="contact-item mb-6 max-w-3xl">
            <h2
              className="font-display text-white leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Got a hard problem?
            </h2>
          </div>

          <div className="contact-item mb-16 max-w-3xl">
            <h2
              className="font-display leading-[0.93] tracking-tight
                         text-transparent"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.18)",
              }}
            >
              Let's build something real.
            </h2>
          </div>

          {/* ── Supporting copy ── */}
          <p
            className="contact-item font-sans text-ghost text-lg max-w-md
                        leading-relaxed mb-16"
          >
            I'm interested in founding-team roles, meaningful consulting, and AI
            systems that matter. Not agencies. Not feature factories.
          </p>

          {/* ── Email ── */}
          <div className="contact-item mb-14 overflow-hidden">
            <EmailCTA />
          </div>

          {/* ── Divider ── */}
          <motion.div
            className="contact-item h-px bg-border mb-10 w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Socials + location ── */}
          <div className="contact-item flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <SocialLink
                href={SITE_CONFIG.social.github}
                label="GitHub"
                index={0}
              />
              <SocialLink
                href={SITE_CONFIG.social.linkedin}
                label="LinkedIn"
                index={1}
              />
              <SocialLink
                href={SITE_CONFIG.social.twitter}
                label="Twitter"
                index={2}
              />
            </div>

            <span className="font-body text-xs text-whisper tracking-widest uppercase">
              Bengaluru, India · {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {/* ── Footer sig ── */}
        <motion.div
          className="mt-24 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <span className="font-display text-sm text-whisper tracking-tight">
            Puneet Pandey
          </span>
          <span className="font-body text-xs text-whisper tracking-widest">
            Built with intention.
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
