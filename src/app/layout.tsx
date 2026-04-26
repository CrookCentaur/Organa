import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Organa Taxonomy — Identify Any Living Organism",
  description:
    "Snap a photo of any plant, animal, insect, or bird and get instant identification with actionable care info. Built for gardeners, farmers, and pet owners.",
  keywords: [
    "organism identification",
    "plant identifier",
    "animal identifier",
    "bird identification",
    "insect identifier",
    "gardening",
    "farming",
    "pet care",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          paddingTop: "var(--nav-height)",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
