/**
 * Systems data — kept in a separate file so content
 * can be updated without touching component logic.
 */

export interface SystemEntry {
  id: string;
  index: string;
  tag: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  accent: string;
  scale: string; // "Production" | "Prototype" | "In Use"
}

export const SYSTEMS: SystemEntry[] = [
  {
    id: "agentic-research",
    index: "01",
    tag: "Agentic AI",
    title: "Autonomous Research & Synthesis Engine",
    problem:
      "Knowledge workers spend 60% of their time finding, reading, and summarising information — before any actual thinking happens.",
    approach:
      "Built a multi-agent pipeline where specialised sub-agents handle search, credibility scoring, cross-source reconciliation, and structured synthesis. Each agent has a narrow contract; an orchestrator manages state and failure recovery. The system degrades gracefully — partial results over no results.",
    outcome:
      "Reduced research-to-draft time from hours to minutes. Deployed inside a B2B SaaS product serving 200+ daily active users. Latency held under 8 seconds for 95th percentile queries.",
    stack: ["LangGraph", "OpenAI", "FastAPI", "Redis", "PostgreSQL"],
    accent: "#00ffc2",
    scale: "Production",
  },
  {
    id: "rag-infra",
    index: "02",
    tag: "RAG Infrastructure",
    title: "Enterprise Knowledge Retrieval System",
    problem:
      "Large organisations hold critical knowledge in PDFs, Notion, Confluence, Slack — siloed, unsearchable, and invisible to AI.",
    approach:
      "Designed a multi-source ingestion pipeline with document-type-aware chunking strategies, hybrid BM25 + vector retrieval, and a re-ranking layer tuned for domain specificity. Built an eval harness to continuously measure retrieval precision before any model change ships.",
    outcome:
      "Precision@5 of 0.87 on internal evals. Ingestion pipeline handles 50,000+ documents with incremental sync. Served as the retrieval backbone for three product features across two companies.",
    stack: ["Pinecone", "LlamaIndex", "Cohere", "Next.js", "Python"],
    accent: "#7c3aed",
    scale: "Production",
  },
  {
    id: "fullstack-saas",
    index: "03",
    tag: "Full Stack Product",
    title: "Zero-to-One SaaS Platform Architecture",
    problem:
      "Most early-stage products are built to ship, not to scale. Tech debt accumulates before product-market fit is found, creating a costly rebuild at exactly the wrong moment.",
    approach:
      "Established a modular monolith architecture with bounded contexts that can extract to services when load demands it. Data layer designed around events from day one — audit trail, replay, and analytics are free. Feature flags and tenant isolation baked into the core, not bolted on.",
    outcome:
      "Platform scaled from 0 to 10,000 users without architectural changes. Feature development velocity stayed constant from month 1 to month 12. Zero breaking migrations in the first year.",
    stack: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "AWS"],
    accent: "#ff6b35",
    scale: "Production",
  },
  {
    id: "llm-eval",
    index: "04",
    tag: "AI Evaluation",
    title: "LLM Output Evaluation & Quality Gate",
    problem:
      "Shipping AI features without a systematic evaluation layer means flying blind — you cannot tell if a model change improved or degraded the product.",
    approach:
      "Built a structured eval framework covering factual accuracy, tone consistency, task completion, and latency SLOs. Integrated into CI/CD as a quality gate. Human feedback loops feed labelled examples back into the eval suite automatically.",
    outcome:
      "Caught 4 regressions before production in the first 3 months. Reduced manual QA time by 70%. Made model upgrade decisions data-driven rather than intuition-driven.",
    stack: ["Python", "OpenAI Evals", "Langfuse", "GitHub Actions"],
    accent: "#00ffc2",
    scale: "In Use",
  },
];
