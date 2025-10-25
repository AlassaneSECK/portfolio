"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import ThemeToggle from "@/app/components/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
};

// Définition centralisée des entrées de navigation (plus simple à maintenir).
const navItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const pathname = usePathname();
  // Normalise l’URL active (suppression du slash final) pour comparer avec `navItems`.
  const activePath = useMemo(() => {
    if (!pathname) {
      return "/";
    }
    return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color-mix(in_lab,var(--color-background) 80%,white)]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(52,211,153,0.15)] text-base font-semibold text-[var(--color-accent-strong)]">
            AS
          </span>
          <span className="hidden sm:inline">Alassane Seck</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activePath === item.href;
              // Les liens actifs reçoivent un fond + `aria-current` pour les lecteurs d’écran.
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-[rgba(52,211,153,0.16)] text-[var(--color-ink)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[var(--color-accent)] after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center justify-center rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)] md:inline-flex"
          >
            Me contacter
          </Link>
          {/* Bouton client qui gère le dataset `data-theme` */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
