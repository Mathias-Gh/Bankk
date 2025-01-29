import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../axiosConfig';
import LoginForm from '../components/LoginForm';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
console.log(formData)
    try {
      const response = await axiosConfig.post('/login', formData);

      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);

      toast.success('Connexion réussie');
      console.log(response.data);

      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <LoginForm formData={formData} handleChange={handleChange} handleLogin={handleLogin} />
  );
};

export default Login;
