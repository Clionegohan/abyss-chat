// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#1e293b', // 例: 深海っぽい色
        bubble: '#bae6fd',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
