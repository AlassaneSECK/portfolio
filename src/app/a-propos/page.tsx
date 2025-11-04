import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";

const highlights = [
  {
    label: "Stack du moment",
    description:
      "Java (Spring Boot) pour l’architecture back-end, Kotlin pour le mobile, et un front moderne quand le projet le réclame."
  },
  {
    label: "Motivation",
    description:
      "Écrire du code qui change réellement la vie d’au moins une personne, même avec un impact modeste."
  },
  {
    label: "Approche",
    description:
      "Découper chaque problématique complexe en micro-projets, les traiter un à un et rester attentif aux échanges de l’équipe."
  },
  {
    label: "Centres d’intérêt",
    description:
      "Intelligence artificielle, immobilier, économie, investissement en crypto et en bourse, toujours guidé par la loyauté."
  }
] as const;

export default function AboutPage() {
  return (
    <Section className="pt-20 md:pt-28">
      <div className="grid gap-12 md:grid-cols-[minmax(0,0.65fr),minmax(0,1fr)] md:gap-16">
        <div className="flex flex-col gap-8">
          <SectionTitle
            eyebrow="À propos"
            title="Alassane Seck, développeur full-stack"
            description="Basé à Lyon, je conçois des expériences robustes avec une vraie appétence pour le back-end tout en restant à l’aise côté front."
          />
          <div className="flex flex-col gap-6 text-base text-[var(--color-muted)] md:text-lg">
            <p>
              Je suis motivé par l’idée que chaque ligne de code puisse avoir un impact concret, même modeste, sur la vie de quelqu’un.
            </p>
            <p>
              Pour résoudre des problèmes complexes, je les découpe en plus petits problèmes que je traite l’un après l’autre. Quand j’intègre une équipe, je prends le temps d’écouter : offrir une oreille attentive facilite la connexion et renforce la collaboration.
            </p>
            <p>
              En dehors du développement, je nourris ma curiosité pour l’intelligence artificielle, l’immobilier, l’économie et l’investissement en crypto comme en bourse. La loyauté reste la valeur qui guide chacune de mes décisions.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.label}
              className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
                {item.label}
              </span>
              <p className="text-sm text-[var(--color-ink)] md:text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
