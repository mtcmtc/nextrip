module.exports = {
  // mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    minWidth: {
     '0': '0',
     '1/4': '25%',
     '1/3': '33.33%',
     '2/5': '40%',
     '1/2': '50%',
     '2/3': '66.66%',
     '3/4': '75%',
     'full': '100%',
    },
    maxWidth: {
     '0': '0',
     '1/4': '25%',
     '1/3': '33.33%',
     '2/5': '40%',
     '1/2': '50%',
     '2/3': '66.66%',
     '3/4': '75%',
     'full': '100%',
     '100px': '100px',
     '150px': '150px',
     '200px': '200px',
     '500px': '500px',
     '600px': '600px',
     '768px': '768px',
    },
    minHeight: {
     '0': '0',
     '1/4': '25%',
     '1/3': '33.33%',
     '2/5': '40%',
     '1/2': '50%',
     '2/3': '66.66%',
     '3/4': '75%',
     'full': '100%',
     'screen': '100vh',
    },
    maxHeight: {
     '0': '0',
     '1/4': '25%',
     '1/3': '33.33%',
     '2/5': '40%',
     '1/2': '50%',
     '2/3': '66.66%',
     '3/4': '75%',
     'full': '100%',
     'screen': '100vh',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
