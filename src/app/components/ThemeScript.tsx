/**
 * Script inline qui restaure le thème sélectionné avant hydratation.
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
