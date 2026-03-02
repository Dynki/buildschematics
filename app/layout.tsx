import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "BlockBlueprints — Minecraft Build Tutorials",
    template: "%s | BlockBlueprints",
  },
  description:
    "Browse hundreds of Minecraft build tutorials sorted by structure, style, and difficulty. From gothic castles to cozy cottages.",
  metadataBase: new URL("https://blockblueprints.example.com"),
  openGraph: {
    siteName: "BlockBlueprints",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream-100 text-rose-950 antialiased">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
