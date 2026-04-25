import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

import { CursorProvider } from "@/context/CursorContext";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import NavProgress from "@/components/navigation/NavProgress";
import { SITE_CONFIG } from "@/config/site";

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  authors: [{ name: SITE_CONFIG.name }],
  keywords: [
    "AI Developer",
    "Full Stack Engineer",
    "Agentic Systems",
    "Bengaluru",
  ],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grain bg-void text-ash antialiased">
        <CursorProvider>
          <SmoothScroll>
            {/* Scroll progress bar */}
            <NavProgress />

            {/* Custom cursor — renders null on mobile/reduced motion */}
            <CustomCursor />

            {/* Page content */}
            <main>{children}</main>
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
