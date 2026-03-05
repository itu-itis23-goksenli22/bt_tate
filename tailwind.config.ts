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
        // The Real World inspired color palette
        primary: {
          DEFAULT: '#0a0a0a',      // Pure black background
          light: '#141414',        // Surface color
          lighter: '#1f1f1f',      // Surface light
          dark: '#000000',         // Deeper black
        },
        accent: {
          DEFAULT: '#3b82f6',      // Primary blue
          light: '#60a5fa',        // Light blue
          dark: '#2563eb',         // Dark blue
          glow: '#1d4ed8',         // Glow effect
        },
        danger: {
          DEFAULT: '#ef4444',      // Red for SOLD OUT, urgency
          light: '#f87171',
          dark: '#dc2626',
        },
        gold: {
          DEFAULT: '#fbbf24',      // Minimal gold usage
          light: '#fcd34d',
          dark: '#f59e0b',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          dark: '#F5EDD6',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.15)',
        },
      },
      maxWidth: {
        'container': '80rem',
      },
      fontSize: {
        // The Real World typography scale
        'display': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],      // 72px
        'display-mobile': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 40px
        'h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],            // 56px
        'h1-mobile': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],       // 32px
        'h2': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],              // 48px
        'h2-mobile': ['1.75rem', { lineHeight: '1.2', fontWeight: '700' }],    // 28px
        'h3': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],              // 32px
        'h3-mobile': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],     // 24px
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],                        // 18px
        'body': ['1rem', { lineHeight: '1.6' }],                               // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],                        // 14px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-135': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-hover': '0 0 60px rgba(59, 130, 246, 0.5)',
        'glow-strong': '0 0 80px rgba(59, 130, 246, 0.4)',
        'gold-glow': '0 0 40px rgba(251, 191, 36, 0.3)',
        'gold-glow-hover': '0 0 60px rgba(251, 191, 36, 0.5)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(6px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(251,191,36,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(251,191,36,0.6)' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        'bounce-x': 'bounce-x 1s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
