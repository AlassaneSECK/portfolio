"use client";

import { useId, useState } from "react";

import type { Project } from "./projectsData";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const contentId = useId();

  const toggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <article
      id={project.id}
      className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-hover)] md:p-10"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={!isCollapsed}
        aria-controls={contentId}
        aria-label={`${isCollapsed ? "Déplier" : "Replier"} le projet ${project.title}`}
        title={isCollapsed ? "Déplier" : "Replier"}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] shadow-sm transition-all hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-strong)]"
      >
        <span
          aria-hidden="true"
          className={`inline-block h-3.5 w-3.5 border-r-2 border-b-2 border-current transition-transform duration-200 ${
            isCollapsed ? "rotate-45" : "-rotate-135"
          }`}
        />
      </button>

      <header className="flex flex-col gap-3 pr-12">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          {project.period}
        </span>
        <h2 className="font-heading text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">{project.title}</h2>
        <p className="text-sm text-[var(--color-muted)] md:text-base">{project.summary}</p>
      </header>

      <div
        id={contentId}
        aria-hidden={isCollapsed}
        className={`mt-8 space-y-8 ${isCollapsed ? "hidden" : "block"}`}
      >
        {project.media && (
          <figure className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-deep)]">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={project.media.poster}
              aria-label={project.media.caption}
            >
              <source src={project.media.src} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo HTML5.
            </video>
            <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 text-sm text-[var(--color-muted)]">
              {project.media.caption}
            </figcaption>
          </figure>
        )}

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] md:gap-10">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Contexte
              </span>
              <p className="mt-3 text-sm text-[var(--color-muted)] md:text-base">{project.context}</p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Contributions clés
              </span>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[var(--color-muted)] md:text-base">
                {project.contributions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-[var(--color-accent-strong)]">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Impact
              </span>
              <p className="mt-3 text-sm text-[var(--color-muted)] md:text-base">{project.impact}</p>
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Stack & outils
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[rgba(52,211,153,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
