import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Ton URL de base
  headers: {
    accept: "application/json",
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
});

// Intercepteur pour ajouter le token dans les requêtes
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    // Vérifie si les headers existent, sinon les initialise
    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs (ex : token expiré)
axiosConfig.interceptors.response.use(
  (response) => response,  // Si la requête réussit, on retourne simplement la réponse
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');  // Supprimer le token expiré
      window.location.href = '/login';  // Redirection vers la page de login
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;