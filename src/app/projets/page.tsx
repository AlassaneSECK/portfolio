import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";

/** Placeholder pour les études de cas détaillées. */
export default function ProjectsPage() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <SectionTitle
        eyebrow="Projets"
        title="Bientôt disponible"
        description="Le détail de mes études de cas sera mis en ligne prochainement."
        align="center"
      />
    </Section>
  );
}
