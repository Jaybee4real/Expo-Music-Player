import {createSlice} from '@reduxjs/toolkit';
import {api} from '../api';
import handleError from '../api/errorHandler';
import {
  saveLoginData,
  storeAuthToken,
  getLoginData,
  clearStoredToken,
  clearLoginData,
} from '../utils/auth';
import {initialisingDone, initialisingStart} from './app';

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true,
    userData: {},
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userData = action.payload.userData;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      clearStoredToken();
      clearLoginData();
    },
  },
});

export default slice.reducer;

export const {saveTempUserData, logout} = slice.actions;
export const {loginSuccess} = slice.actions;

export const login = payload => async dispatch => {
  try {
    const result = await api.post('/api/users/token/obtain/', payload);
    storeAuthToken(result.data.access, 'jwt');
    // TEMP
    saveLoginData(payload);
    dispatch(loginSuccess({userData: result.data}));
    return true;
  } catch (e) {
    return handleError(e);
  }
};

export const socialLogin = payload => async dispatch => {
  // console.log(JSON.stringify(payload, null, 2))
  try {
    const result = await api.post('/api/oauth/convert-token/', payload);
    console.log(result)
    storeAuthToken(result.data.access_token, 'bearer');
    // TEMP
    saveLoginData(payload);
    dispatch(loginSuccess({userData: result.data}));
    return true;
  } catch (e) {
    return handleError(e);
  }
};

// TEMP rehydrate user login data from local storage

let rehydrationInterval;

export const rehydrateLogin = () => async dispatch => {
  clearInterval(rehydrationInterval);
  dispatch(initialisingStart());
  const loginData = await getLoginData();
  if (!loginData) {
    dispatch(initialisingDone());
    return;
  }

  const reLogin = async () => {
    let result;
    if (!loginData.accessToken) {
      result = await dispatch(login(loginData));
    } else {
      result = await dispatch(socialLogin(loginData));
    }
    return result;
  };

  await reLogin();
  dispatch(initialisingDone());
};


export const signUp = payload => async dispatch => {
  try {
    await api.post('/api/users/signup/', payload);
    const {email, password} = payload;
    dispatch(login({email, password}));
    return true;
  } catch (e) {
    return handleError(e);
  }
};

// export const loginWithApple = payload => async dispatch => {
//   try {
//     const result = await api.post('/api/oauth/convert-token/', {
//       grant_type: 'convert_token',
//       client_id: BACKEND_CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       backend: 'apple-id',
//       token: payload.accessToken,
//     });
//     // TEMP
//     saveLoginData(payload);
//     dispatch(loginSuccess({userData: result.data}));
//     return true;
//   } catch (e) {
//     return handleError(e);
//   }
// };

// export const loginWithGoogle = payload => async dispatch => {
//   const requestPayload = {
//     grant_type: 'convert_token',
//     client_id: BACKEND_CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     backend: 'google-oauth2',
//     token: payload.accessToken,
//   };
//   try {
//     const result = await api.post('/api/oauth/convert-token/', requestPayload);
//     console.log({result: result.data});
//     // TEMP
//     saveLoginData(requestPayload);
//     dispatch(loginSuccess({userData: result.data}));
//     return true;
//   } catch (e) {
//     return handleError(e);
//   }
// };
