/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./web/**/*.{html,tmpl,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
