import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    mode:'no-cors',
    headers: {
        accept: "application/json",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
        

    }
});

axiosConfig.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
    
export default axiosConfig;
