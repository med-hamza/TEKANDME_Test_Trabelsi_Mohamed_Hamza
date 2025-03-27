import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-skin-red',
    'bg-skin-filter',
    'bg-yellow-100',
    'bg-form-completed',
  ],
  theme: {
    extend: {
      fontFamily: {
        island: ["var(--font-island)", "cursive"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        skin: {
          base: '#f9f1ee',
          border: '#e5e5e5',
          accent: '#f17474',
          light: '#f9bcbc',
          home: '#FAF7F2',
          input: '#DBE2EF',
          filter: "#f3d3a0",
          muted: "#74a0a0",
          text: '#4B332F',
          pink: '#F87777',
          red: 'red-200',
          yellow: 'yellow-100',

        },
        form: {
          input: '#7B7B7B',
          green: '#5C9967',
          completed: '#a8edb4'
        },
        brown: {
          900: "#422b23",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
