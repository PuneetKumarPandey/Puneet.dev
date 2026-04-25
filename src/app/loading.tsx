/**
 * Next.js route-level loading fallback.
 * Shown by the App Router during async page loading.
 * Kept intentionally minimal — PageLoader handles the real experience.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-void flex items-center justify-center">
      <div className="h-px w-16 bg-border overflow-hidden rounded-full">
        <div
          className="h-full bg-neon rounded-full animate-[shimmer_1s_ease-in-out_infinite]"
          style={{ width: "40%" }}
        />
      </div>
    </div>
  );
}
