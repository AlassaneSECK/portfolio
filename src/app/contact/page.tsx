import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";
import ContactForm from "@/app/components/ContactForm";

/**
 * Page Contact du portfolio.
 */
export default function ContactPage() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center">
      <SectionTitle
        eyebrow="Contact"
        title="Entrons en contact"
        description="Écrivez-moi à alassane.seck@alass-code.com ou utilisez le formulaire ci-dessous pour une réponse rapide."
        align="center"
      />
      <ContactForm />
    </Section>
  );
}
