/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: 'var(--color-void)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        textMain: 'var(--color-text)',
        textMuted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(13, 13, 20, 0.7) 0%, rgba(13, 13, 20, 0.3) 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(108, 99, 255, 0.25)',
        'glow-secondary': '0 0 20px rgba(0, 212, 255, 0.25)',
        'glow-accent': '0 0 20px rgba(255, 107, 53, 0.25)',
      }
    },
  },
  plugins: [],
}
