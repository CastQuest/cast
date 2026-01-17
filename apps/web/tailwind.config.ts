import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        cq: {
          bg: '#020617',
          card: 'rgba(15,23,42,0.85)',
          border: 'rgba(148,163,184,0.35)',
          accent: '#22d3ee',
          accentSoft: 'rgba(34,211,238,0.35)'
        }
      },
      boxShadow: {
        'cq-glow-cyan': '0 0 24px rgba(34,211,238,0.45)',
        'cq-glow-violet': '0 0 24px rgba(168,85,247,0.45)'
      }
    }
  },
  plugins: []
};

export default config;
