const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
          colors: {
              'logoColor': '#FFFFFF',
              'baseColor': '#141B2D',
              'bgSecondary': '#303B4E',
              'bgComponent': '#24303E',
              'primaryColor': '#FFD700',
              'textColor': '#CCC',
              'alertColor': '#FF5722',
              'sucessColor': '#2ECC71'
          },
          fontSize: {
              sm: '12px',
              base: '14px',
              xl: '23px'
          },
          fontFamily: {
              title: 'Poppins_700Bold',
              alt: 'Poppins_300Light',
              subtitle: 'Poppins_600SemiBold',
              body: 'Poppins_400Regular',
          }
      },
  },
  plugins: [],
}

module.exports = {...config}
