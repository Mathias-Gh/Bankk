import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosConfiguration from "../AxiosConfiguration"
import RegisterForm from "../components/RegisterForm";
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    try {
      const response = await AxiosConfiguration.post('/auth/register', formData);

      toast.success('Bravo, vous êtes inscrit. Veuillez vous connecter.');
      console.log(response.data);

      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Échec de l\'inscription. Vérifiez vos identifiants.');
    }
  };

  return (
    <RegisterForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
};

export default Register;
