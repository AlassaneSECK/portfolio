import Link from "next/link";

const socials = [
  { href: "https://github.com/AlassaneSECK", label: "GitHub" },
  { href: "https://www.linkedin.com/in/alassane-seck-5ba407296/", label: "LinkedIn" },
  { href: "mailto:alassane.seck@alass-code.com", label: "Email" }
];

/**
 * Footer statique : rappelle les liens sociaux et s’adapte aux tailles d’écran.
 * Les liens externes ouvrent un nouvel onglet tout en restant sécurisés (`rel="noopener"`).
 */
export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-[var(--color-muted)] sm:px-6 md:flex-row md:px-8">
        <span>© {new Date().getFullYear()} Alassane Seck — Disponible pour missions</span>
        <div className="flex items-center gap-4">
          {socials.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-accent-strong)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
