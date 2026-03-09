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
        // Primary palette
        olive: '#5C6B4A',
        'soft-pink': '#E8C4C4',
        plum: '#6B4C7A',
        'warm-brown': '#C9A67A',
        'near-black': '#1C1917',
        cream: '#FAF7F2',
        'cream-alt': '#F5F0E8',
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'body': ['"Libre Franklin"', 'system-ui', 'sans-serif'],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
