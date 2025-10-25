import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ThemeScript from "@/app/components/ThemeScript";

/**
 * Chargement des fontes via l’API `next/font`.
 * - `variable` injecte un custom property utilisable dans Tailwind.
 * - `display: swap` évite le flash de texte invisible (FOIT).
 */
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

/**
 * Métadonnées partagées sur toutes les routes.
 * Next les expose dans le head au moment du rendu serveur.
 */
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
    "Portfolio",
    "Freelance"
  ]
};

/**
 * Layout racine App Router :
 * - Encapsule toutes les pages dans la même structure header / footer.
 * - `ThemeScript` réapplique le thème stocké avant hydratation (voir composant dédié).
 * - La skip link améliore l’accessibilité clavier en sautant directement au contenu.
 */
export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-theme="light" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[var(--color-background)] text-[var(--color-ink)]">
        <ThemeScript />
        <a
          href="#main"
          className="sr-only absolute left-6 top-6 z-50 inline-flex rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:-translate-y-1 focus:shadow-lg focus:shadow-[rgba(52,211,153,0.45)]"
        >
          Aller au contenu
        </a>
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
