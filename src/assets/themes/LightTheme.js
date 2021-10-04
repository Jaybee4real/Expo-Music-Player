import { DefaultTheme } from '@react-navigation/native';

const LightTheme = {
  colors: {
    ...DefaultTheme.colors,
    primary: "#E89AA6",
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
    color: '#fff0',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 30,
  },
};

export default LightTheme;
