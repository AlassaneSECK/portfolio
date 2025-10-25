import type { ReactNode } from "react";

type ElementTag = keyof HTMLElementTagNameMap;

type SectionProps<T extends ElementTag = "section"> = {
  id?: string;
  className?: string;
  as?: T;
  children: ReactNode;
};

/**
 * Wrapper générique utilisé pour toutes les sections verticales de la page.
 * - Autorise le passage d’un autre tag (`as`) pour varier la sémantique au besoin.
 * - Concatène des classes utilitaires Tailwind communes (padding + max width).
 */
export default function Section<T extends ElementTag = "section">({
  id,
  className,
  children,
  as
}: SectionProps<T>) {
  const Tag = (as ?? "section") as ElementTag;
  const classes = [
    "mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:px-8 md:py-20",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
