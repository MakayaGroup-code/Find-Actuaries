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
        primary: {
          50: '#EEF1F7',
          100: '#D9E0EC',
          200: '#B7C2DC',
          300: '#8FA0C4',
          400: '#6680A8',
          500: '#3D4F7F',
          600: '#2C3B63',
          700: '#23304F',
          800: '#1B2540',
          900: '#161F35',
          950: '#0D131F',
        },
        accent: '#B8672A',
      },
    },
  },
  plugins: [],
};
export default config;