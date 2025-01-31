// components/AccountDetails.tsx
import React from 'react';

interface AccountDetailsProps {
  name: string;
  iban: string;
  balance: number;
  status: boolean;
  main: boolean;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ name, iban, balance, status, main }) => {
  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="mt-2 text-gray-600">IBAN: {iban}</p>
      <p className="mt-2 text-gray-600">Solde: {balance} €</p>
      <p className="mt-2 text-gray-600">{main ? 'Compte principal' : 'Compte secondaire'}</p>
      <p className="mt-2 text-gray-600">{status ? 'Compte actif' : 'Compte clôturé'}</p>
    </div>
  );
};

export default AccountDetails;