"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SystemCard from "./SystemCard";
import { SYSTEMS } from "./systemsData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Systems() {
  // Only one card open at a time — accordion pattern
  const [openId, setOpenId] = useState<string | null>(null);

  const headerRef = useScrollReveal<HTMLDivElement>({
    selector: ".sys-header-item",
    from: { y: 28, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.9 },
    stagger: 0.13,
    start: "top 80%",
  });

  const listRef = useScrollReveal<HTMLDivElement>({
    selector: ".sys-card-item",
    from: { y: 36, opacity: 0 },
    to: { y: 0, opacity: 1, ease: "power3.out", duration: 0.85 },
    stagger: 0.1,
    start: "top 82%",
  });

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionWrapper id="systems" className="bg-void">
      <div className="container py-section">
        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="sys-header-item flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-ember" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-ember">
              Systems
            </span>
          </div>

          <div className="sys-header-item flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-display leading-[0.93] tracking-tight text-white"
              style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}
            >
              What I've{" "}
              <em
                className="not-italic text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
              >
                built.
              </em>
            </h2>

            <p className="sys-header-item font-sans text-ghost text-base max-w-xs leading-relaxed md:text-right">
              Real systems. Real problems. Real outcomes. Not case studies —
              architecture decisions.
            </p>
          </div>
        </div>

        {/* ── Column headers (desktop) ── */}
        <div className="hidden md:grid grid-cols-[6rem_1fr_12rem_2.5rem] gap-4 pb-4 border-b border-border mb-0">
          {["Index", "System", "Status", ""].map((h, i) => (
            <span
              key={i}
              className="font-body text-xs text-whisper tracking-widest uppercase"
            >
              {h}
            </span>
          ))}
        </div>

        {/* ── Accordion list ── */}
        <div ref={listRef}>
          {SYSTEMS.map((system) => (
            <div key={system.id} className="sys-card-item">
              <SystemCard
                system={system}
                isOpen={openId === system.id}
                onToggle={() => toggle(system.id)}
              />
            </div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.div
          className="mt-14 flex items-start gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="mt-1 h-px w-8 bg-border flex-shrink-0" />
          <p className="font-sans text-sm text-whisper leading-relaxed max-w-lg">
            These aren't polished case studies. They're honest accounts of
            problems I chose to solve, decisions I made under constraints, and
            the outcomes that resulted.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
