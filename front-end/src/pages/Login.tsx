import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Appel à l'API backend pour l'authentification
      const response = await axios.post('/api/login', { email, password });

      // Succès : tu peux rediriger l'utilisateur ou afficher un message
      toast.success('Connexion réussie');
      console.log(response.data);

      // Rediriger l'utilisateur vers une page protégée
      navigate('/home');
    } catch (error) {
      // Gérer les erreurs de connexion
      console.error(error);
      toast.error('Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <LoginForm formData={formData} handleLogin={handleLogin} />
  );
};

export default Login;