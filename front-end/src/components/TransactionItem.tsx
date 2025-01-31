import React from 'react';

interface Transaction {
  date: string;
  description: string;
  type: string;
  amount: number;
  accountId: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  getAccountName: (accountId: string) => string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, getAccountName }) => {
  return (
    <div className="mb-4">
      <div className="text-gray-500">{transaction.date}</div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <div className="flex items-center">
            <span className="mr-2">🔄</span>
            <div>
              <div>{transaction.description}</div>
              <div className="text-gray-500">{transaction.type}</div>
              <div className="text-gray-500">{getAccountName(transaction.accountId)}</div>
            </div>
          </div>
        </div>
        <div className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
          {transaction.amount} €
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;