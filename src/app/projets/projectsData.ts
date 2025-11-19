export type ProjectMedia = {
  src: string;
  caption: string;
  poster?: string;
};

export type Project = {
  id: string;
  title: string;
  period: string;
  summary: string;
  context: string;
  stack: readonly string[];
  contributions: readonly string[];
  impact: string;
  media?: ProjectMedia;
};

export const projects: Project[] = [
  {
    id: "cryptoportiques-arles",
    title: "Exploration immersive des cryptoportiques d'Arles",
    period: "2024-2025 · 9 mois 1/2",
    summary:
      "Application de visite VR multi-supports pour valoriser un monument classé au patrimoine mondial de l'UNESCO.",
    context:
      "Projet tutoré puis stage au service du patrimoine d'Arles. Travail initial en équipe de quatre, puis prise en charge en autonomie complète durant le stage.",
    stack: [
      "TypeScript",
      "Socket.IO",
      "Three.js",
      "Python",
      "Flask",
      "Docker",
      "Bash",
      "GitHub Actions",
      "GitLab CI"
    ],
    contributions: [
      "Co-conception de l'architecture client/serveur (diagrammes, base de données, flux Socket.IO).",
      "Développement front TypeScript pour la navigation VR : déplacements, interactions casque et UI responsive.",
      "Mise en place du backend Python + Flask + Socket.IO et scripts Bash pour automatiser l'assemblage des images Docker.",
      "Prise en charge en solo des évolutions demandées (quiz immersif, refonte UI, gestion des points d'intérêt 3D, tutoriel guidé).",
      "Organisation des démos, collecte des besoins et pilotage des priorités avec les parties prenantes malgré les aléas matériels."
    ],
    impact:
      "Présentations à 30-40 personnes, 15 tests utilisateurs réussis et capacité à livrer une démo complète en deux mois malgré les contraintes de matériel et de réseau.",
    media: {
      src: "/projects/cryptoportiques/video/portfolio_projet_cryptoportique.mp4",
      caption: "Démo immersive des cryptoportiques d'Arles (VR et multi-supports)"
    }
  },
  {
    id: "seba-mobile",
    title: "Application mobile de relevés pour le SEBA",
    period: "2023 · 1 semestre",
    summary:
      "Solution Android dédiée aux agents du SEBA pour mesurer la qualité de l'eau sur le terrain par OCR ou saisie manuelle.",
    context:
      "Projet de fin de BTS SNIR mené pour le syndicat des eaux du bassin de l'Ardèche. Équipe de quatre côté étude, responsable unique du développement mobile.",
    stack: ["Kotlin", "SQLite", "OCR", "Android", "Windows Forms (interop)"],
    contributions: [
      "Conception de l'architecture logicielle (diagrammes d'architecture, de classe et de séquence) en coordination avec l'application bureau Windows Forms.",
      "Développement complet de l'application Android Kotlin avec parcours OCR et saisie manuelle des analyses terrain.",
      "Implémentation de la persistance locale SQLite et synchronisation des relevés vers l'application bureau.",
      "Suivi qualité et accompagnement de l'équipe pour assurer la cohérence des flux de données entre mobile et desktop."
    ],
    impact:
      "Accélération de la collecte de données et fiabilisation des relevés pour une exploitation immédiate côté bureau d'études."
  }
];
