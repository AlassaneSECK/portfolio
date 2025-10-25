import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";

/** Page contact simplifiée : invite à utiliser l’email ou la CTA de la home. */
export default function ContactPage() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <SectionTitle
        eyebrow="Contact"
        title="Entrons en contact"
        description="Écrivez-moi à alassane.seck@alass-code.com ou utilisez le formulaire d’accueil."
        align="center"
      />
    </Section>
  );
}
