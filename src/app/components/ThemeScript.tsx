/**
 * Script inline injecté dans le layout pour réappliquer le thème choisi
 * avant l’hydratation React (évite un flash clair/sombre).
 * On reste en JS natif pour ne pas dépendre de l’exécution React côté client.
 */
export default function ThemeScript() {
  const script = `
    (function() {
      try {
        var storageKey = 'theme';
        var stored = localStorage.getItem(storageKey);
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored || (prefersDark ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {
        document.documentElement.dataset.theme = 'light';
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
