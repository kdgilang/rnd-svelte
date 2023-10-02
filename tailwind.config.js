/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'purpel': '#704674',
      'green': '#1b8415',
      'red': '#b21c0e'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    transitionDuration: {
      DEFAULT: '250ms',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
        lg: '4rem',
      },
    },
    extend: {
      colors: {
        "slate-900": "#333333",
        "slate-700": "#444444",
        "slate-600": "#5b5f62",
        "slate-500": "#CCCCCC",
        "slate-200": "#EEEEEE",
        
        "slate-100": "#efefef",

        "sky-400": "#231e12",
        "sky-500": "#blue",
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
    }
  },
  plugins: [],
}

