import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";
import Reveal from "@/app/components/Reveal";

type Project = {
  id: string;
  title: string;
  period: string;
  summary: string;
  context: string;
  stack: readonly string[];
  contributions: readonly string[];
  impact: string;
};

const projects: Project[] = [
  {
    id: "cryptoportiques-arles",
    title: "Exploration immersive des cryptoportiques d'Arles",
    period: "2024-2025 · 9 mois 1/2",
    summary:
      "Application de visite VR multi-supports pour valoriser un monument classé au patrimoine mondial de l'UNESCO.",
    context:
      "Projet tutoré puis stage au service du patrimoine d'Arles. Travail initial en équipe de quatre, puis prise en charge en autonomie complète durant le stage.",
    stack: [
      "TypeScript",
      "Socket.IO",
      "Three.js",
      "Python",
      "Flask",
      "Docker",
      "Bash",
      "GitHub Actions",
      "GitLab CI"
    ],
    contributions: [
      "Co-conception de l'architecture client/serveur (diagrammes, base de données, flux Socket.IO).",
      "Développement front TypeScript pour la navigation VR : déplacements, interactions casque et UI responsive.",
      "Mise en place du backend Python + Flask + Socket.IO et scripts Bash pour automatiser l'assemblage des images Docker.",
      "Prise en charge en solo des évolutions demandées (quiz immersif, refonte UI, gestion des points d'intérêt 3D, tutoriel guidé).",
      "Organisation des démos, collecte des besoins et pilotage des priorités avec les parties prenantes malgré les aléas matériels."
    ],
    impact:
      "Présentations à 30-40 personnes, 15 tests utilisateurs réussis et capacité à livrer une démo complète en deux mois malgré les contraintes de matériel et de réseau."
  },
  {
    id: "seba-mobile",
    title: "Application mobile de relevés pour le SEBA",
    period: "2023 · 1 semestre",
    summary:
      "Solution Android dédiée aux agents du SEBA pour mesurer la qualité de l'eau sur le terrain par OCR ou saisie manuelle.",
    context:
      "Projet de fin de BTS SNIR mené pour le syndicat des eaux du bassin de l'Ardèche. Équipe de quatre côté étude, responsable unique du développement mobile.",
    stack: ["Kotlin", "SQLite", "OCR", "Android", "Windows Forms (interop)"],
    contributions: [
      "Conception de l'architecture logicielle (diagrammes d'architecture, de classe et de séquence) en coordination avec l'application bureau Windows Forms.",
      "Développement complet de l'application Android Kotlin avec parcours OCR et saisie manuelle des analyses terrain.",
      "Implémentation de la persistance locale SQLite et synchronisation des relevés vers l'application bureau.",
      "Suivi qualité et accompagnement de l'équipe pour assurer la cohérence des flux de données entre mobile et desktop."
    ],
    impact:
      "Accélération de la collecte de données et fiabilisation des relevés pour une exploitation immédiate côté bureau d'études."
  }
];

/**
 * Page Projets du portfolio.
 */
export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Section>
        <SectionTitle
          eyebrow="Projets"
          title="Une expertise qui s'exprime sur le terrain"
          description="Zoom sur deux réalisations marquantes mêlant VR, mobile natif, backend et DevOps."
        />
        <div className="mt-12 flex flex-col gap-12">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <article
                id={project.id}
                className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-hover)] md:p-10"
              >
                <header className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    {project.period}
                  </span>
                  <h2 className="font-heading text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[var(--color-muted)] md:text-base">{project.summary}</p>
                </header>

                <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] md:gap-10">
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
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

