import React from 'react';

interface Account {
  id: string;
  name: string;
}

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccount: string;
  onAccountChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({ accounts, selectedAccount, onAccountChange }) => {
  return (
    <select className="border p-2 rounded" onChange={onAccountChange} value={selectedAccount}>
      <option value="all">Tous les comptes</option>
      {accounts.map(account => (
        <option key={account.id} value={account.id}>{account.name}</option>
      ))}
    </select>
  );
};

export default AccountSelector;