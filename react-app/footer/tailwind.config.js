
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'normal-white': '#f9f9f9', 
        },
        backgroundImage: {
          'blue-gradient': 'linear-gradient(to right, #1e3a8a, #3b82f6)' // contoh gradasi biru
        }
      }
    },
    plugins: [],
  }
