import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindcssSignals from 'tailwindcss-signals';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '&>*');
    }),
    tailwindcssSignals,
  ],
};

export default config;