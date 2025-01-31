// components/AccountCard.tsx
import React from 'react';

interface AccountCardProps {
  id: number;
  name: string;
  iban: string;
  balance: number;
  onClick: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ id, name, iban, balance, onClick }) => {
  return (
    <div onClick={onClick} className="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-200">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">IBAN: {iban}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-800">Solde: {balance} €</p>
      </div>
    </div>
  );
};

export default AccountCard;