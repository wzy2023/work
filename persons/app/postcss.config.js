export default {
  plugins: {
    tailwindcss: {},
  },
  theme: {
    extend: {
      animation: {
        'complete': 'complete 0.6s cubic-bezier(0, 0, 1, 1)',
        'counter-rotate': 'counter-rotate 0.6s cubic-bezier(0, 0, 1, 1)',
      },
    },
  },
};
