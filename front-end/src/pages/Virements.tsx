import React, { useEffect, useState } from "react";
import AxiosConfiguration from "../AxiosConfiguration";
import toast from 'react-hot-toast';
import AddBeneficiary from "../components/AddBeneficiary";

const Virements: React.FC = () => {
  const [beneficiaries, setBeneficiaries] = useState<{ name: string; iban: string; isUserAccount?: boolean }[]>([]);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await AxiosConfiguration.get('/beneficiaires/get/all');
        setBeneficiaries(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('Endpoint non trouvé. Vérifiez l\'URL de l\'API.');
        } else {
          toast.error('Échec de la récupération des bénéficiaires.');
        }
      }
    };

    fetchBeneficiaries();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des bénéficiaires</h1>
      <AddBeneficiary />
      <ul className="space-y-4">
        {beneficiaries.map((beneficiary, index) => (
          <li key={index} className={`p-4 bg-white shadow-lg rounded-lg ${beneficiary.isUserAccount ? 'border-blue-500' : 'border-gray-300'}`}>
            <h2 className="text-xl font-bold">{beneficiary.name}</h2>
            <p className="text-gray-600">{beneficiary.iban}</p>
            {beneficiary.isUserAccount && <p className="text-blue-500">Compte de l'utilisateur</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Virements;
