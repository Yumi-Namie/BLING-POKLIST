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
        blingGray: '#1f2937',
        pokeRed: '#E94343',
      },
    },
  },
  plugins: [],
};
export default config;
