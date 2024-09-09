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
        heading: ['Mulish', 'sans-serif'], 
      },
      colors: {
        pokeGray: '#1f2937',
        pokeRed: '#E94343',
        pokeBlue: {
          600: '#0000FF',
          500: '#2563eb',
        }
      },
    },
  },
  plugins: [],
};
export default config;
