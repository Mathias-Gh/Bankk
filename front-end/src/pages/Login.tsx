import AxiosConfiguration from '../AxiosConfiguration';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    
  };

  const handleLogin = async () => {
    console.log('Logging in...');
    try {
      console.log('Attempting to log in with:', formData);
      const response = await AxiosConfiguration.post('/login', formData);
      console.log('Server response:', response);
  
      const {access_token} = response.data;
      console.log(response.data);

      if (access_token) {
        localStorage.setItem('access_token', access_token); // Stocker le token
        toast.success('Connexion réussie');
        console.log('Access token stored:', access_token);
  
        // Rediriger vers une autre page après la connexion
        console.log('Redirecting to /mescomptes');
        navigate('/mescomptes');
      } else {
        console.error('No access token received');
        toast.error('Échec de la connexion. Aucun token reçu.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <>
      <LoginForm formData={formData} handleChange={handleChange} handleLogin={handleLogin} />
    </>
  );
};

export default Login;