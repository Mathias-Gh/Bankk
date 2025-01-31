import React from 'react';
import AccountItem from './AccountItem';

interface Account {
  id: number;
  name: string;
  iban: string;
  balance: number;
  status: boolean;
  main: boolean;
}

interface AccountListProps {
  accounts: Account[];
  onAccountClick: (account: Account) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onAccountClick }) => {
  return (
    <ul className="mt-4 space-y-4">
      {accounts.map((account) => (
        <AccountItem key={account.id} account={account} onClick={() => onAccountClick(account)} />
      ))}
    </ul>
  );
};

export default AccountList;