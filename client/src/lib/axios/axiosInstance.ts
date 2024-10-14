import axios from 'axios';
import { getAccessToken } from '../utils';
import { VITE_API_URL } from '@/env';

export const axiosInstance = axios.create({
  baseURL: `${VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((req) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
