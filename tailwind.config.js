const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      // Les couleurs sont des variables CSS (canaux RGB, cf. index.css) : elles
      // basculent en mode sombre tout en gardant les modificateurs d'opacité (/10…).
      colors: {
        // Palette dérivée du logo ICHH (bleus profonds, ciel, sarcelle)
        ink: {
          DEFAULT: c('ink'), // bleu marine profond — sections sombres, titres
          soft: c('ink-soft'),
          muted: c('ink-muted'),
        },
        sand: {
          DEFAULT: c('sand'), // blanc bleuté — fonds clairs
          deep: c('sand-deep'),
        },
        ember: {
          DEFAULT: c('ember'), // sarcelle (la main du logo) — accent principal / CTA
          soft: c('ember-soft'),
        },
        moss: c('moss'), // bleu ciel (le globe)
        gold: c('gold'), // bleu franc (les lettres ICHH)
        surface: c('surface'), // champs de formulaire : blanc / bleu nuit
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '78rem',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
