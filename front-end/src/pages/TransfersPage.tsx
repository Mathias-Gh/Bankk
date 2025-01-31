import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactionService';
import TransferForm from '../components/TransferForm';

interface Transaction {
  id: number;
  amount: number;
  type: string;
  status: string;
  // Ajoutez d'autres propriétés si nécessaire
}

const TransfersPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const token = localStorage.getItem('token') || '';

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(token);
      setTransactions(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const handleTransferSuccess = () => {
    console.log('Transfert réussi');
    fetchTransactions(); // Rafraîchir la liste des transactions après un transfert réussi
  };

  return (
    <div>
      <h1>Virements</h1>
      <TransferForm token={token} onTransferSuccess={handleTransferSuccess} />
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} - {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransfersPage;