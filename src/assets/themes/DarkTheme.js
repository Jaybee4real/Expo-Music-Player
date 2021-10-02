import {DarkTheme as reactNavDarkTheme} from '@react-navigation/native';

const DarkTheme = {
  dark: true,
  colors: {
    ...reactNavDarkTheme.colors,
    primary: '#111111',
    text: '#fff',
    background: '#EFEFF3',
    secondaryColor: '#ffffff',
    green: '#00D395',
    border: 'grey',
    purple: '#A463FF',
    brown: '#e89aa64d',
    lightBrown: '#FFCE2B',
    pink: '#FF3F73',
  },
  blurredText: {
    fontWeight: '600',
    color: 'rgba(255,255,255, .00)',
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255, .9)',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 30,
  }, /// //use This To Blur Account Balances In A Fintech App For Example
};

export default DarkTheme;
