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
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Réinitialiser l'erreur lors de la modification
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await AxiosConfiguration.post('/register', {
        email: formData.email,
        password: formData.password
      });

      toast.success('Bravo, vous êtes inscrit. Veuillez vous connecter.');
      console.log(response.data);

      navigate('/login');
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Échec de l\'inscription. Veuillez réessayer.');
      }
    }
  };

  return (
    <RegisterForm 
      formData={formData} 
      handleChange={handleChange} 
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default Register;
