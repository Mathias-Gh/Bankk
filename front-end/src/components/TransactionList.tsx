import React from 'react';
import TransactionItem from './TransactionItem';

interface Transaction {
  date: string;
  description: string;
  type: string;
  amount: number;
  accountId: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  getAccountName: (accountId: string) => string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, getAccountName }) => {
  return (
    <>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} getAccountName={getAccountName} />
        ))
      ) : (
        <div className="text-gray-500">Aucune transaction trouvée.</div>
      )}
    </>
  );
};

export default TransactionList;