import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";

/**
 * Route placeholder : réutilise Section/SectionTitle pour afficher un message temporaire.
 * Permet de garder une cohérence visuelle en attendant le contenu détaillé.
 */
export default function AboutPage() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <SectionTitle
        eyebrow="À propos"
        title="Cette page arrive très bientôt"
        description="En attendant, vous pouvez découvrir l’accueil pour un aperçu de mon univers produit & design."
        align="center"
      />
    </Section>
  );
}
