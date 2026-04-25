import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

/**
 * Reusable ghost/outline heading — replaces scattered WebkitTextStroke inline styles.
 * Used in Hero, Philosophy, Capabilities, Vision for "think." "build." etc.
 */
export default function GhostHeading({
  children,
  className,
  as: Tag = "span",
}: Props) {
  return (
    <Tag
      className={clsx("text-transparent select-none", className)}
      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
    >
      {children}
    </Tag>
  );
}
