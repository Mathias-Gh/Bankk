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
    try {
      const response = await AxiosConfiguration.post('/auth/login', formData);
      console.log('Server response:', response);
  
      const {token} = response.data;
      console.log(response.data);

      if (token) {
        localStorage.setItem('token', token); 
        toast.success('Connexion réussie');
        console.log('Access token stored:', token);

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