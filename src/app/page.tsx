import Link from "next/link";
import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";
import Reveal from "@/app/components/Reveal";
import GitHubIcon from "@/app/components/icons/GitHubIcon";
import LinkedInIcon from "@/app/components/icons/LinkedInIcon";

/**
 * Page d’accueil : composant serveur Next.js (App Router).
 * - Les tableaux `strengths`, `projects`, `articles`, `socialLinks` servent de source de vérité
 *   et alimentent directement le JSX via `map`, ce qui permet de conserver un rendu statique côté serveur.
 * - Chaque bloc visuel est encapsulé dans un composant `Section` (structure + spacing) et `Reveal`
 *   (animation d’apparition côté client). Les fragments d’UI n’ont pas d’état local, on reste sur un rendu
 *   déclaratif simplifié.
 */

// Liste des axes de valeur sur lesquels tu souhaites insister.
const strengths = [
  {
    title: "Performance",
    description: "Budgets de perf, audits Core Web Vitals et front-end profiling pour garder l'app réactive.",
    icon: "🚀"
  },
  {
    title: "Accessibilité",
    description: "Design system accessible, navigation clavier et conformité WCAG dès la conception.",
    icon: "♿"
  },
  {
    title: "3D & Intégration",
    description: "Expériences 3D/Three.js scénarisées qui restent légères et maintenables dans le temps.",
    icon: "🧊"
  }
] as const;

// Sélection de projets pour la grille “Projets en vedette”.
const projects = [
  {
    id: "nebula-studio",
    title: "Nebula Studio",
    pitch: "Parcours architectural immersif, synchronisé en temps réel entre tablette et desktop.",
    tags: ["Next.js", "Three.js", "Realtime"],
    cta: "#"
  },
  {
    id: "orion-dashboard",
    title: "Orion Dashboard",
    pitch: "Pilotage d'objets connectés avec alerting prédictif et visualisation 3D.",
    tags: ["React", "WebGL", "IoT"],
    cta: "#"
  },
  {
    id: "hydra-labs",
    title: "Hydra Labs Platform",
    pitch: "Suite R&D modulaire avec design system accessible et pipeline CI/CD complet.",
    tags: ["TypeScript", "Design System", "CI/CD"],
    cta: "#"
  }
] as const;

// Articles ou billets mis en avant dans la section blog.
const articles = [
  {
    title: "Maintenir 60 FPS sur un projet React + WebGL",
    date: "Jan 2025",
    href: "#",
    excerpt:
      "Budgets de performance, streaming des assets et monitoring continu sans sacrifier l'UX."
  },
  {
    title: "Accessibilité : to-do list pour design systems",
    date: "Déc 2024",
    href: "#",
    excerpt:
      "Focus states, raccourcis clavier et documentation vivante pour aligner équipes produit & dev."
  },
  {
    title: "Industrialiser le handover développeur",
    date: "Nov 2024",
    href: "#",
    excerpt:
      "Guides de contribution, observabilité et accompagnement pour transmettre un socle pérenne."
  }
] as const;

// Liens sociaux : on stocke le composant icône pour pouvoir l’afficher plus bas.
const socialLinks = [
  { href: "https://github.com/AlassaneSECK", label: "GitHub", icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/alassaneseck", label: "LinkedIn", icon: LinkedInIcon }
] as const;

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-16 md:gap-24">
      {/* SECTION HERO : présentation générale et appels à l’action principaux */}
      <Section className="pt-14 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)] md:gap-16">
          <Reveal className="flex flex-col gap-8">
            {/* Badge d’état : donne immédiatement le ton sur le type de missions recherchées */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(52,211,153,0.15)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              Disponible pour projets à impact humain
            </span>
            <div className="flex flex-col gap-4">
              {/* Titre principal : angle éditorial davantage centré sur la valeur humaine */}
              <h1 className="font-heading text-4xl font-semibold leading-tight text-[var(--color-ink)] md:text-5xl">
                Je crée des expériences numériques utiles et humaines.
              </h1>
              {/* Paragraphe d’accroche : met en avant les soft skills et l’engagement personnel */}
              <p className="max-w-xl text-lg text-[var(--color-muted)] md:text-xl">
                Du projet de valorisation des cryptoportiques d&apos;Arles à l&apos;application mobile que je conçois pour mieux gérer mon quotidien, je m&apos;investis à 100 % dans chaque aventure. Communication, esprit d&apos;équipe, adaptabilité et curiosité nourrissent ma progression continue pour rester sérieux, autonome et persévérant, même sous pression.
              </p>
            </div>
            {/* Bloc de boutons : navigation vers projets, CV et recommandation */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/projets"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(52,211,153,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:bg-[var(--color-accent-strong)] sm:w-auto"
              >
                Voir mes projets
              </Link>
              <Link
                href="/documents/Alassane_Seck_CV.pdf"
                className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)] sm:w-auto"
              >
                Télécharger mon CV
              </Link>
              <Link
                href="/documents/Lettre recommandation Alassane Seck.pdf"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)] sm:w-auto"
                >
                  Lettre de recommandation
                </Link>
            </div>
            {/* Liens sociaux : rendu des icônes SVG dans les pastilles */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                // On instancie dynamiquement l’icône : `Icon` est un composant React.
                // Chaque bouton reste un lien externe sécurisé (target blank + rel noopener).
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)] focus-visible:text-[var(--color-accent-strong)]"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="relative">
            {/* Effet lumineux arrière-plan */}
            <div className="absolute inset-0 -translate-y-6 scale-105 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.25),_transparent_60%)] blur-2xl opacity-80" />
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]">
              <div className="absolute inset-0 opacity-[0.15]" aria-hidden="true">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[var(--color-accent)]"
                >
                  <defs>
                    <pattern
                      id="dots"
                      x="0"
                      y="0"
                      width="16"
                      height="16"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
              {/* Carte descriptive du projet signature (mix texte + storytelling) */}
              <div className="relative flex aspect-[16/10] flex-col justify-between bg-gradient-to-br from-white via-[rgba(52,211,153,0.08)] to-white p-6 text-[var(--color-ink-card)]">
                <div>
                  <span className="inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-[var(--color-muted-card)] backdrop-blur">
                    Projet signature
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-[var(--color-ink)]">
                    Projet de valorisation des cryptoportiques de la ville D&apos;Arles.
                  </h2>
                  <p className="mt-2 max-w-md text-sm text-[var(--color-muted-card)]">
                    J&apos;ai eu l&apos;opportunité de travailler dans un projet de valorisation d&apos;un monument classé
                      au patrimoine mondiale de l&apos;unesco durant mon stage au service du patrimoine de la ville d&apos;Arles.
                      Ce projet a consisté a développer une application de visite immersive en 3D des crytoportiques.
                    Une application multiplateforme, multijoueur et compatible avec la réalité virtuelle.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  {/* Pile de techno et CTA secondaire vers la page projets */}
                  <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    Three.js · HTML/CSS · Typescript · Python
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-card)]">2025</span>
                    <Link
                      href="/projets"
                      className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-strong)] hover:bg-[rgba(16,185,129,0.08)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)]"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION EXPERTISES : synthèse des piliers de collaboration */}
      <Section>
        <SectionTitle
          eyebrow="Expertises"
          title="Ce que j’apporte à vos projets"
          description="Un binôme design/tech solide, des rituels clairs et un socle fiable pour accélérer."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {strengths.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="h-full">
              {/* Le `delay` progressif crée un effet de cascade lorsque Reveal déclenche son animation */}
              <article className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-hover)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(52,211,153,0.18)] text-xl">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                {/* Chaque carte décrit un axe de collaboration mis en avant */}
                <h3 className="mt-4 font-heading text-xl font-semibold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION PROJETS : trois études de cas synthétiques */}
      <Section>
        <SectionTitle
          eyebrow="Projets"
          title="Projets en vedette"
          description="Quelques cas récents où la performance, l'accessibilité et l'esthétique se rencontrent."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 90} className="h-full">
              {/* Même principe : cascade animée sur chaque carte projet */}
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-hover)]">
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[rgba(52,211,153,0.25)] via-[rgba(52,211,153,0.15)] to-transparent">
                  <div className="absolute inset-0 opacity-20 mix-blend-multiply">
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[var(--color-accent-strong)]"
                    >
                      <defs>
                        <pattern
                          id={`${project.id}-grid`}
                          width="24"
                          height="24"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M24 0H0v24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#${project.id}-grid)`} />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-5">
                  {/* Liste des technologies : pastilles colorées pour chaque tag */}
                  <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]/80">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[rgba(52,211,153,0.12)] px-3 py-1 text-[var(--color-accent-strong)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[var(--color-ink)]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">{project.pitch}</p>
                  <div className="mt-auto flex items-center justify-between text-sm font-semibold text-[var(--color-ink)]">
                    {/* Lien principal orienté “cas d’usage” */}
                    <Link
                      href={project.cta}
                      className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent-strong)]"
                    >
                      Voir le projet
                      <span aria-hidden="true">↗</span>
                    </Link>
                    {/* Lien secondaire pour rediriger vers le GitHub global */}
                    <Link
                      href="https://github.com/AlassaneSECK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent-strong)]"
                    >
                      GitHub
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION ARTICLES : contenu éditorial pour prolonger la découverte */}
      <Section>
        <SectionTitle
          eyebrow="Articles récents"
          title="Partages & retours d’expérience"
          description="Quelques notes pour documenter ce que j’apprends en chemin."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal key={article.title} delay={index * 80}>
              {/* Animation Reveal appliquée aux cartes d’articles pour garder une cohérence visuelle */}
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-hover)]">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {article.date}
                </span>
                {/* Titre + extrait pour chaque contenu partagé */}
                <h3 className="font-heading text-xl font-semibold text-[var(--color-ink)]">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">{article.excerpt}</p>
                <Link
                  href={article.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-strong)]"
                >
                  Lire l’article
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION CONTACT : invitation finale à la prise de contact */}
      <Section>
        <Reveal className="flex flex-col gap-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-soft)] md:flex-row md:items-center md:justify-between md:text-left">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-semibold text-[var(--color-ink)]">
              Un projet en tête ? Parlons-en.
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Je réponds sous 24–48h avec une première proposition de cadrage et des disponibilités pour avancer.
            </p>
          </div>
          {/* Deux options de contact : email direct et prise de rendez-vous */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="mailto:alassane.seck@alass-code.com"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(52,211,153,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:bg-[var(--color-accent-strong)]"
            >
              M’écrire
            </Link>
            <Link
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-accent-strong)]"
            >
              Prendre un créneau
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
