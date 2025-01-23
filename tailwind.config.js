
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {      
      borderWidth: { 
        1: "1px",
      },
      backgroundImage: {
        glass: "linear-gradient(152.97deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      height: {
        '17': '4.25rem',
        '22': '5.5rem',
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      textUnderlineOffset: {
        3: '3px',
      },
      maskImage: {
        'horizontal-fade': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      },
      maskRepeat: {
        'no-repeat': 'no-repeat',
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(50%)" },
          to: { transform: "translateX(calc(-50% - var(--gap)))" },
        },
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.mask-horizontal-fade': {
          '-webkit-mask-image': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          'mask-image': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          '-webkit-mask-repeat': 'no-repeat',
          'mask-repeat': 'no-repeat',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },

  ],
}

