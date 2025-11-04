"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

/**
 * Toggle de thème clair/sombre.
 */
export default function ThemeToggle() {
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") {
      return "light";
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    } catch (error) {
      console.error("Theme init error", error);
      return "light";
    }
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    try {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.error("Theme persist error", error);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const label =
    theme === "light" ? "Activer le mode sombre" : "Activer le mode clair";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={theme === "dark"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent)] focus-visible:text-[var(--color-accent)] dark:bg-[var(--color-surface)]"
    >
      <span className="sr-only">{label}</span>
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-14a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1Zm0 16a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1ZM4 13a1 1 0 0 0 0-2H3a1 1 0 1 0 0 2h1Zm17 0a1 1 0 0 0 0-2h-1a1 1 0 1 0 0 2h1ZM6.22 7.34a1 1 0 1 0 1.42-1.42l-.7-.7A1 1 0 0 0 5.5 6.64l.72.7Zm12.56 9.9a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.41l-.7-.7Zm0-11.32l.7-.7A1 1 0 0 0 18.06 4l-.7.7a1 1 0 0 0 1.42 1.42Zm-12.56 9.9l-.7.7a1 1 0 0 0 1.41 1.42l.7-.7a1 1 0 1 0-1.41-1.42Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M5.64 4.22a1 1 0 0 1 1.14-.21A8 8 0 0 0 19 12a7.94 7.94 0 0 1-1.34 4.45a1 1 0 0 1-1.48.18a6 6 0 0 0-8-8a1 1 0 0 1-.18-1.48A8 8 0 0 0 5.64 4.22ZM12 20a8 8 0 0 1-6.32-12.89a8 8 0 0 0 9.21 9.21A8 8 0 0 1 12 20Z"
          />
        </svg>
      )}
    </button>
  );
}
