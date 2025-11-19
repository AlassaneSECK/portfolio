# Portfolio

## Démarrage rapide

```bash
npm install
npm run dev
```

## Gestion des vidéos lourdes

Les vidéos sont servies via l’API Route `/api/video`, qui lit les fichiers par segments (`Range`) pour éviter de charger un fichier complet en mémoire sur l’hébergement Hostinger.

1. Place les fichiers optimisés dans `public/media` en suivant la convention `<asset>-<variant>.<format>` (ex. `cryptoportiques-demo-desktop.mp4` ou `hero-mobile.webm`).
2. Les variantes acceptées sont `desktop` et `mobile`. S’il manque une variante, la route retombera automatiquement sur `desktop`.
3. Côté format, Next ne demande qu’un `mp4` par défaut. Ajoute un `webm` optimisé puis passe `formats={["webm","mp4"]}` au composant si besoin.
4. Utilise le composant `AdaptiveVideo` pour intégrer la ressource : il génère les `<source>` nécessaires et pointe vers `/api/video`.

### Compression recommandée

```bash
# MP4 léger optimisé pour le streaming progressif
ffmpeg -i source.mp4 -vf scale=1920:-1 -c:v libx264 -crf 28 -preset veryfast -movflags +faststart public/media/mon-asset-desktop.mp4

# Variante mobile optionnelle
ffmpeg -i source.mp4 -vf scale=1080:-1 -c:v libx264 -crf 30 -preset veryfast -movflags +faststart public/media/mon-asset-mobile.mp4

# Encodage WebM à ajouter dès que possible
ffmpeg -i source.mp4 -vf scale=1920:-1 -c:v libvpx-vp9 -b:v 0 -crf 35 -c:a libopus public/media/mon-asset-desktop.webm
```

### Exemple d’utilisation

```tsx
import AdaptiveVideo from "@/app/components/AdaptiveVideo";

<AdaptiveVideo
  assetId="cryptoportiques-demo"
  className="rounded-2xl"
  controls
  poster="/media/cryptoportiques-demo-poster.jpg"
/>
```

### Vérifications manuelles

- `npm run dev` puis ouverture de `/` et `/projets` pour s’assurer que la vidéo démarre, que les contrôles répondent et que la pagination des données n’est pas bloquée.
- Dans DevTools > Network, vérifier que `/api/video?...` renvoie bien du `206 Partial Content` avec les bons en-têtes `Content-Range`.
