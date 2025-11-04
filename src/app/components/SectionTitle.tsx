type SectionTitleProps = Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}>;

/**
 * Titre de section réutilisable pour l’App Router.
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionTitleProps) {
  const alignmentClasses =
    align === "center" ? "mx-auto items-center text-center" : "items-start text-left";

  return (
    <div className={`flex w-full max-w-3xl flex-col gap-3 ${alignmentClasses}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="font-heading text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="text-base text-[var(--color-muted)] md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
