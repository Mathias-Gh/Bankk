// components/AddAccountForm.tsx
import React, { useState } from 'react';

interface AddAccountFormProps {
  onAddAccount: (accountName: string) => void;
}

const AddAccountForm: React.FC<AddAccountFormProps> = ({ onAddAccount }) => {
  const [accountName, setAccountName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountName) {
      onAddAccount(accountName);
      setAccountName(''); // Reset input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-6">
      <input
        type="text"
        placeholder="Nom du compte"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Ajouter un compte
      </button>
    </form>
  );
};

export default AddAccountForm;