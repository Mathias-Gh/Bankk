import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosConfiguration from "../AxiosConfiguration"
import RegisterForm from "../components/RegisterForm";
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)

    try {
      const response = await AxiosConfiguration.post('/register', formData);

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
