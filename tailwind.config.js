export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Palette dérivée du logo ICHH (bleus profonds, ciel, sarcelle)
        ink: {
          DEFAULT: '#0A3A5A', // bleu marine profond — sections sombres, titres
          soft: '#0F4A70',
          muted: '#5C7B8E',
        },
        sand: {
          DEFAULT: '#EEF6FB', // blanc bleuté — fonds clairs
          deep: '#DCEBF4',
        },
        ember: {
          DEFAULT: '#0E7C8E', // sarcelle (la main du logo) — accent principal / CTA
          soft: '#5AC5CB',
        },
        moss: '#2E93C7', // bleu ciel (le globe)
        gold: '#1F6FA8', // bleu franc (les lettres ICHH)
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
