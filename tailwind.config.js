const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
    
  ],
  theme: {
    extend: {
      colors: {
        'gun-metal-900' : '#242729',
        'gun-metal-800' : '#2B3033',
        'gun-metal-700' : '#323C42',
        'sand-yellow-900' : '#EAD16E',
        'sand-yellow-800' : '#51503F'

      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

// 900 #242729
// 700 #323C42
// 600 #46555F
// sand-yellow #EAD16E

//blue-gray-100 #E3ECF1
