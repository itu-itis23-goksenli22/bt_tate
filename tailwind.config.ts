import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0a0e1a',
          light: '#111827',
          dark: '#050810',
        },
        accent: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          glow: '#1d4ed8',
        },
        gold: {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#f59e0b',
        },
      },
      maxWidth: {
        'container': '80rem',
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1' }],
        'display-mobile': ['2.1rem', { lineHeight: '1.2' }],
        'h2': ['3.44rem', { lineHeight: '1.2' }],
        'h2-mobile': ['1.8rem', { lineHeight: '1.2' }],
        'body': ['1.125rem', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-135': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-hover': '0 0 60px rgba(59, 130, 246, 0.5)',
        'gold-glow': '0 0 40px rgba(251, 191, 36, 0.3)',
        'gold-glow-hover': '0 0 60px rgba(251, 191, 36, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
