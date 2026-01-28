import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refined palette
        ivory: '#FFFFF0',
        beige: '#F5F5DC',
        'beige-pink': '#FAF0E6',
        'warm-white': '#FDFBF7',
        'soft-pink': '#F5E6E8',
        // Accent colors - stable and consistent
        'pink-accent': '#D4A5A5',
        'olive-green': '#5C6B4A',
        // Text and emphasis
        'deep-brown': '#2C2420',
        // Plum ONLY for Laurier links
        'plum': '#6B4C7A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Libre Franklin"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Refined type scale - larger and more dramatic
        'xs': ['0.8125rem', { lineHeight: '1.5' }],
        'sm': ['0.9375rem', { lineHeight: '1.6' }],
        'base': ['1.0625rem', { lineHeight: '1.7' }],
        'lg': ['1.1875rem', { lineHeight: '1.6' }],
        'xl': ['1.375rem', { lineHeight: '1.5' }],
        '2xl': ['1.75rem', { lineHeight: '1.4' }],
        '3xl': ['2.25rem', { lineHeight: '1.3' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
        '5xl': ['3.75rem', { lineHeight: '1.1' }],
        '6xl': ['4.5rem', { lineHeight: '1.05' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
