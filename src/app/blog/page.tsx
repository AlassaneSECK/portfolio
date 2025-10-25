import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";

/** Page blog temporaire : on garde la même ossature pour limiter la dette design. */
export default function BlogPage() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <SectionTitle
        eyebrow="Blog"
        title="Articles en cours d’écriture"
        description="Quelques billets seront partagés ici très bientôt."
        align="center"
      />
    </Section>
  );
}
