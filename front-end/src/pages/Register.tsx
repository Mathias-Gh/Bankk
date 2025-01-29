import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import RegisterForm from "../components/RegisterForm";
import toast from 'react-hot-toast';


const Register: React.FC = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    try {
        const response = await axios.post('/api/auth', { 
            email: formData.email,
            password: formData.password,
         });
  
        toast.success('Bravo tu es inscrit, go te connecté');
        console.log(response.data);
  
        navigate('/login');
      } catch (error) {

        console.error(error);
        toast.error('Échec de l\'inscription. Vérifiez vos identifiants.');
      }

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    console.log("Form Data: ", formData);
  };

  return (
    <RegisterForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
};

export default Register;