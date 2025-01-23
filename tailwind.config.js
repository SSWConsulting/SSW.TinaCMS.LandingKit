
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {      
      colors: { 
        sswRed: "#cc4141",
        sswDarkRed: "#8e2c2c",
      },
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
        ripple: "ripple-out 0.6s",
        "ripple-pseudo": "ripple-out-pseudo 0.6s",
        rippling: "rippling 0.6s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
        "ripple-out": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "ripple-out-pseudo": {
          "0%": { background: "rgba(0, 0, 0, 0.25)" },
          "100%": { background: "transparent" },
        },
        rippling: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          },
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

