import { hslaColors } from './src/theme/hslaColors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // corePlugins: {
  //   preflight: false
  // },
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        'color-base': 'hsl(var(--color-base) / <alpha-value>)',
        bkg: {
          base: 'hsl(var(--bg-base) / <alpha-value>)'
        },
        ...hslaColors('primary')
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: []
};
