import axios from 'axios';

const AxiosConfiguration = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

AxiosConfiguration.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosConfiguration;
