/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        neon: '#7efff5'
      },
      boxShadow: {
        neon: '0 0 15px rgba(126,255,245,0.5)',
        glass: '0 10px 40px rgba(0,0,0,0.2)'
      },
      backgroundImage: {
        'radial-dark': 'radial-gradient(circle at 20% 20%, rgba(126, 255, 245, 0.15), transparent 25%), radial-gradient(circle at 80% 0%, rgba(124, 58, 237, 0.25), transparent 25%), linear-gradient(135deg, #0f172a, #111827)'
      }
    }
  },
  plugins: []
};
