module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'oswald': ['Oswald', 'sans-serif'],
      'monserrat': ['Montserrat', 'san-serif'],
    },
    extend: {
      maxHeight: {
        '128': '32rem',
      },
      spacing:{
        '2/3': '66.666667%',
      },
      backgroundImage: {
        'login-image': "url('https://images.unsplash.com/photo-1596571315951-15d4bf6ee5c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')",
      },
      colors: {
        'dark': {
          100: '#3A3B3C',
          200: '#242526',
          300: '#161616',
        },
        'light': {
          100: '#E4E6EB',
          200: '#B8BBBF',
        },
        'primary': {
          100: '#5FC9D7',
          200: '#33B9CB',
        },
        'favRed': {
          100: '#DA4167',
        },
      }, 
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
