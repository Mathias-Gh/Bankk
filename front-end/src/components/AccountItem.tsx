import React from 'react';
import AccountCard from './AccountCard';

interface Account {
  id: number;
  name: string;
  iban: string;
  balance: number;
  status: boolean;
  main: boolean;
}

interface AccountItemProps {
  account: Account;
  onClick: () => void;
}

const AccountItem: React.FC<AccountItemProps> = ({ account, onClick }) => {
  return (
    <li>
      <AccountCard {...account} onClick={onClick} />
    </li>
  );
};

export default AccountItem;