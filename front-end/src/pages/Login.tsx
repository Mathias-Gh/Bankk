import AxiosConfiguration from '../AxiosConfiguration';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await AxiosConfiguration.post('/login', formData);
      console.log('Server response:', response);

      const {access_token} = response.data;
      console.log(response.data);

      if (access_token) {
        localStorage.setItem('access_token', access_token);
        toast.success('Connexion réussie');
        console.log('Access token stored:', access_token);
        navigate('/mescomptes');
      } else {
        setErrors({ email: 'Échec de la connexion. Aucun token reçu.' });
        toast.error('Échec de la connexion. Aucun token reçu.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 404) {
            setErrors({ email: 'Utilisateur non trouvé' });
          } else if (error.response.status === 403) {
            setErrors({ password: 'Mot de passe incorrect' });
          } else {
            setErrors({ email: 'Une erreur est survenue. Veuillez réessayer.' });
          }
        } else if (error.request) {
          // The request was made but no response was received
          setErrors({ email: 'Pas de réponse du serveur. Veuillez réessayer plus tard.' });
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrors({ email: 'Une erreur est survenue. Veuillez réessayer.' });
        }
      } else {
        setErrors({ email: 'Une erreur inattendue est survenue.' });
      }
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  return (
    <>
      <LoginForm 
        formData={formData} 
        handleChange={handleChange} 
        handleLogin={handleLogin}
        errors={errors}
      />
    </>
  );
};

export default Login;