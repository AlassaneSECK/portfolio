import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ThemeScript from "@/app/components/ThemeScript";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: {
    default: "Alassane Seck — Développeur Full-Stack",
    template: "%s | Alassane Seck"
  },
  description:
    "Développeur full-stack spécialisé en React, TypeScript et Three.js. Interfaces performantes, accessibles et orientées produit.",
  authors: [{ name: "Alassane Seck" }],
  creator: "Alassane Seck",
  keywords: [
    "Développeur full-stack",
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Tailwind CSS",
    "Java",
    "Spring Boot",
    "API REST",
    "DevOps",
    "CI/CD",
    "Docker",
    "GitHub Actions",
    "GitLab CI",
    "Kotlin",
    "Android",
    "SQLite",
    "OCR",
    "Socket.IO",
    "Flask",
    "Réalité virtuelle",
    "VR 3D",
    "Portfolio",
    "Freelance"
  ]
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" data-theme="light" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[var(--color-background)] text-[var(--color-ink)]">
        <ThemeScript />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
