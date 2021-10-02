import axios from 'axios';
// import {API_BASE_URL} from '@env';
const API_BASE_URL = ""

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token, type) => {
  const tokenStrategy = type === 'jwt' ? 'JWT' : 'Bearer';
  if (token) {
    api.defaults.headers.common.Authorization = `${tokenStrategy} ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
