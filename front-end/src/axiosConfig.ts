import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    accept: "application/json",
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Pas besoin de cookies
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;