import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { VyomeraBackground } from "@/components/background/VyomeraBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "VYOMERA GAMES — Build Your Own Library",
  description:
    "VYOMERA GAMES is a next-generation gaming platform built around your personal game library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body className="antialiased">
        {/*
          VyomeraBackground is position:fixed, z-index:0, pointer-events:none.
          It sits behind all page content on every route.
          Mounted once here — never duplicated per-page.
        */}
        <VyomeraBackground />
        {/*
          Page content sits above the background via relative positioning.
          All pages must have a transparent (or semi-transparent) background
          so the global animated grid shows through.
        */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}