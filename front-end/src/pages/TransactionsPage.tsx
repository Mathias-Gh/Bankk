import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactions } from '../api/transactionService';
import { getAccounts } from '../api/accountService';
import { AxiosError } from 'axios';
import AccountSelector from '../components/AccountSelector';
import TransactionList from '../components/TransactionList';

interface Transaction {
  date: string;
  description: string;
  type: string;
  amount: number;
  accountId: string;
}

interface Account {
  id: string;
  name: string;
  iban: string;
}

const TransactionsPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('all');

  useEffect(() => {
    const fetchTransactionsAndAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const [transactionData, accountData] = await Promise.all([
            getTransactions(token),
            getAccounts(token)
          ]);
          setTransactions(transactionData);
          setAccounts(accountData);
        } else {
          setError("Token d'authentification manquant.");
        }
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          setError(err.response.data.detail || "Erreur lors de la récupération des données.");
        } else {
          setError((err as Error).message);
        }
      }
    };

    fetchTransactionsAndAccounts();
  }, [accountId]);

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(event.target.value);
  };

  const filteredTransactions = selectedAccount === 'all'
    ? transactions
    : transactions.filter(transaction => transaction.accountId === selectedAccount);

  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Compte inconnu';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex justify-between items-center mb-4">
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onAccountChange={handleAccountChange}
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded">Faire un virement</button>
      </div>

      <div className="text-4xl font-bold mb-2">1234,56€</div>
      <div className="text-gray-500 mb-4">En attente : 0€</div>

      <input
        type="text"
        placeholder="Rechercher une transaction"
        className="border p-2 rounded w-full mb-4"
      />

      <div className="flex justify-between items-center mb-4">
        <select className="border p-2 rounded">
          <option>Janvier 2025</option>
          {/* Add more month options here */}
        </select>
        <button className="border p-2 rounded flex items-center">
          Télécharger un relevé <span className="ml-2">📥</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button className="border-b-2 border-black">Transactions</button>
        <button className="text-gray-500">Recettes</button>
        <button className="text-gray-500">Dépenses</button>
      </div>

      <TransactionList transactions={filteredTransactions} getAccountName={getAccountName} />
    </div>
  );
};

export default TransactionsPage;