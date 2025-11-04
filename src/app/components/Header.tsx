"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/app/components/ThemeToggle";

type NavItem = Readonly<{
  href: string;
  label: string;
}>;

const navItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

/**
 * Barre de navigation principale du site.
 */
export default function Header() {
  const pathname = usePathname();
  const activePath = useMemo(() => {
    if (!pathname) {
      return "/";
    }
    return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  }, [pathname]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const previousPathRef = useRef(activePath);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    previousPathRef.current = activePath;
    if (previousPath === activePath || !isMenuOpen) {
      return;
    }
    const timer = window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [activePath, isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)] md:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M6.343 6.343a1 1 0 0 1 1.414 0L12 10.586l4.243-4.243a1 1 0 1 1 1.414 1.414L13.414 12l4.243 4.243a1 1 0 0 1-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 0 1-1.414-1.414L10.586 12L6.343 7.757a1 1 0 0 1 0-1.414Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16a1 1 0 1 0 0-2H4a1 1 0 1 0 0 2Zm16 4H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2Zm0 6H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--color-border)] bg-[color-mix(in_lab,var(--color-background) 80%,white)]/95 backdrop-blur-lg md:hidden"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
            <nav aria-label="Navigation principale mobile">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activePath === item.href;
                  return (
                    <li key={`${item.href}-mobile`}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-[rgba(52,211,153,0.16)] text-[var(--color-ink)]"
                            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(52,211,153,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:bg-[var(--color-accent-strong)]"
                >
                  Me contacter
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
