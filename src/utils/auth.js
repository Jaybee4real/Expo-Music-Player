import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthToken} from '../api';

export const retrieveAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
};

export const clearStoredToken = async () => {
  await AsyncStorage.removeItem('token');
};

export const storeAuthToken = async (token, type) => {
  await clearStoredToken();
  setAuthToken(token, type);
  await AsyncStorage.setItem('token', token);
};

export const checkLogin = ({result, navigation}) => {
  if (result.error.message === 'invalid token') {
    navigation.navigate('Login', {isReturnScreen: true});
  }
};

export const initialiseToken = async () => {
  const token = await retrieveAuthToken();
  if (!token) {
    return;
  }

  setAuthToken(token);
  return true; // as token exists in storage
};

/**
 * We are using these methods temporarily to make sure a user is logged in
 * and has active token to interact with API
 */
export const saveLoginData = data => {
  AsyncStorage.setItem('tempLoginData', JSON.stringify(data));
};

export const getLoginData = async () => {
  const dataString = await AsyncStorage.getItem('tempLoginData');
  if (dataString) {
    return JSON.parse(dataString);
  }
  return null;
};

export const clearLoginData = async () => {
  await AsyncStorage.removeItem('tempLoginData');
};

export const setFirstLanch = async () => {
  console.log('Setting FIrst');
  await AsyncStorage.setItem('isFirstLaunch', 'false');
};

// export const getFirstLaunch = async () => {
//   const isFirstTime = await AsyncStorage.getItem('isFirstLaunch');
//   if (isFirstTime) {
//     return false;
//   } else return true;
// };
