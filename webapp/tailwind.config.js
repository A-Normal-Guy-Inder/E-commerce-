/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      /*
       * Palette that was previously hand-written as .bg-theme-* / .text-theme-*
       * rules duplicated across header, footer and customer-profile stylesheets.
       * Declared here the generated utility names are identical, so templates
       * did not have to change.
       */
      colors: {
        theme: {
          light: '#E3FDFD',
          card: '#CBF1F5',
          border: '#CBF1F5',
          primary: '#71C9CE',
          accent: '#A6E3E9',
          input: '#A6E3E9',
          dark: '#222222',
          muted: '#555555',
        },
      },
      boxShadow: {
        'lg-bottom': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
      },
    },
  },
  plugins: [],
}
