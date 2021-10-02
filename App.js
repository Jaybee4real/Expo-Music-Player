import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Host } from 'react-native-portalize';
// redux
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store';

// Themes And Fonts
import { LightTheme, DarkTheme } from './src/assets/themes';

// Authentication Screens
import Login from './src/screens/auth/Login';
import Welcome from './src/screens/auth/Welcome';
import Signup from './src/screens/auth/Signup';

// In App Screens
import Home from './src/screens/Home';
import MusicPlayer from './src/screens/MusicPlayer';

// Imports for App Component
import { isIphoneWithNotch } from './src/utils/helpers';
import { NativeBaseProvider } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import { initialisingDone } from './src/store/app';
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/screens/LoadingScreen';

const Stack = createStackNavigator();
const App = () => {
  const state = useSelector(state => state);
  const { isInitialising, appTheme } = useSelector(state => state.app);
  const theme = appTheme === 'light' ? LightTheme : DarkTheme;
  const dispatch = useDispatch();
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  let [fontsLoaded] = useFonts({
    "Inter-300": require("./src/assets/fonts/Inter-Light.ttf"),
    "Inter-400": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-500": require("./src/assets/fonts/Inter-Medium.ttf"),
    "Inter-600": require("./src/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-700": require("./src/assets/fonts/Inter-Bold.ttf"),
    "Inter-800": require("./src/assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-900": require("./src/assets/fonts/Inter-Black.ttf"),
    "Montserrat-300": require("./src/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-400": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-500": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-600": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-700": require("./src/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-800": require("./src/assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-900": require("./src/assets/fonts/Montserrat-Black.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(initialisingDone())
    }, 1000);
    showWelcomeScreen()
  }, [dispatch])

  async function showWelcomeScreen() {
    const isFirstTime = await AsyncStorage.getItem('isFirstLaunch');
    console.log('isFirstTime', isFirstTime)
    if (isFirstTime !== 'false') {
      setIsFirstLaunch(true)
    }
  }

  if (isInitialising || !fontsLoaded) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer theme={theme}>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS, /// //Can Be Changed
          }}>
          {isFirstLaunch && <Stack.Screen name="Welcome" component={Welcome} />}
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer >
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeBaseProvider>
  );
};
