/**
 * AUDIT: Extracted capability data from index.tsx — same pattern as systemsData.ts.
 * Components should never own their content.
 */

export interface Capability {
  id: number;
  domain: string;
  title: string;
  detail: string;
  icon: string;
  accent: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: 1,
    domain: "Architecture",
    title: "Design scalable, production-grade systems",
    detail:
      "From monolith to microservice, event-driven to serverless — systems that handle real load and evolve without rewrites.",
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10",
    accent: "#00ffc2",
  },
  {
    id: 2,
    domain: "AI Systems",
    title: "Build intelligent, agentic AI workflows",
    detail:
      "LLM orchestration, RAG pipelines, multi-agent coordination — AI that acts, reasons, and integrates into real business logic.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: "#7c3aed",
  },
  {
    id: 3,
    domain: "Product Thinking",
    title: "Translate business problems into systems",
    detail:
      "I work backwards from outcomes, not technology. Every architecture decision is a product decision.",
    icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    accent: "#ff6b35",
  },
  {
    id: 4,
    domain: "Full Stack",
    title: "Own the entire delivery surface",
    detail:
      "Frontend to infrastructure, API to deployment — no handoff loss. One engineer, complete ownership.",
    icon: "M5 12h14M12 5l7 7-7 7",
    accent: "#00ffc2",
  },
  {
    id: 5,
    domain: "Generative AI",
    title: "Ship LLM-native product features at speed",
    detail:
      "Prompt engineering, fine-tuning, evaluation frameworks, cost-optimised inference — built for production, not demos.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    accent: "#7c3aed",
  },
  {
    id: 6,
    domain: "Systems Thinking",
    title: "Identify leverage points in complex problems",
    detail:
      "Find the one decision that unlocks ten downstream ones. Systemic reasoning over reactive fixes.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    accent: "#ff6b35",
  },
];
