import React, { useState } from "react";
import AxiosConfiguration from "../AxiosConfiguration";
import BeneficiaryModal from "../modal/BeneficiaryModal";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddBeneficiary: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', iban: '' });
  const [errors, setErrors] = useState({ name: '', iban: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({ name: '', iban: '' });

    try {
      const response = await AxiosConfiguration.post('/beneficiaires/create', { ...formData, isUserAccount: false });
      console.log('Server response:', response);

      toast.success('Bénéficiaire ajouté avec succès');
      setIsModalOpen(false);
      navigate('/virements');
    } catch (error: any) {
      console.error('Error adding beneficiary:', error);

      if (error.response && error.response.status === 404) {
        toast.error('Endpoint non trouvé. Vérifiez l\'URL de l\'API.');
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Échec de l'ajout du bénéficiaire. ${error.response.data.message}`);
        setErrors({ ...errors, iban: error.response.data.message });
      } else {
        toast.error('Échec de l\'ajout du bénéficiaire. Vérifiez les informations fournies.');
        setErrors({ ...errors, iban: 'Vérifiez les informations fournies.' });
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
      >
        Ajouter un bénéficiaire
      </button>
      {isModalOpen && (
        <BeneficiaryModal
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AddBeneficiary;
