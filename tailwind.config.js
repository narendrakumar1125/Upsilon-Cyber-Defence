/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary': '#7dd3fc',
        'secondary': '#818cf8',
        'dark': {
          DEFAULT: '#020617',
          100: '#0f172a',
          200: '#1e293b',
          300: '#334155',
        },
        'light': '#f8fafc',
        'accent': '#a78bfa',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, var(--primary), var(--secondary))',
        'cyber-grid': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgPHBhdGggZD0iTSAwIDUwIEwgNTAgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0MCwgMjQ1LCAxOTMsIDAuMikiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPHBhdGggZD0iTSA1MCAwIEwgNTAgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0MCwgMjQ1LCAxOTMsIDAuMikiIHN0cm9rZS13aWR0aD0iMSIvPgogIDwvcGF0dGVybj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')",
      },
      keyframes: {
        gridMove: {
          '0%': { transform: 'perspective(1000px) rotateX(60deg) translateY(0)' },
          '100%': { transform: 'perspective(1000px) rotateX(60deg) translateY(50px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      animation: {
        'grid-move': 'gridMove 20s linear infinite',
        'float': 'float 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
