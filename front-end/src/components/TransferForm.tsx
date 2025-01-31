import React, { useState } from 'react';
import { transferFunds } from '../api/transactionService';

interface TransferFormProps {
  token: string;
  onTransferSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ token, onTransferSuccess }) => {
  const [formData, setFormData] = useState({
    account_iban_from: '',
    account_iban_to: '',
    amount: 0,
    transaction_note: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await transferFunds(token, formData);
      onTransferSuccess();
    } catch (error) {
      console.error('Erreur lors du transfert:', error);
    }
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire ou effectuer d'autres actions d'annulation
    setFormData({
      account_iban_from: '',
      account_iban_to: '',
      amount: 0,
      transaction_note: '',
    });
    console.log('Transfert annulé');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Effectuer un Virement</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account_iban_from">
          IBAN Source
        </label>
        <input
          type="text"
          name="account_iban_from"
          placeholder="IBAN Source"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account_iban_to">
          IBAN Destinataire
        </label>
        <input
          type="text"
          name="account_iban_to"
          placeholder="IBAN Destinataire"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Montant
        </label>
        <input
          type="number"
          name="amount"
          placeholder="Montant"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transaction_note">
          Note de Transaction
        </label>
        <input
          type="text"
          name="transaction_note"
          placeholder="Note de transaction"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Transférer
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default TransferForm;