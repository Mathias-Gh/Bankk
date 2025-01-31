import React, { useEffect, useState, useCallback } from 'react';
import { addAccount } from '../api/accountService';
import AccountCard from '../components/AccountCard';
import AddAccountForm from '../components/AddAccountForm';
import { AxiosError } from 'axios';
import AxiosConfiguration from '../AxiosConfiguration';
import { useNavigate } from 'react-router-dom';

interface Account {
  id: number;
  name: string;
  iban: string;
  balance: number;
  status: boolean;
  main: boolean;
}

const getUserAccounts = async (token: string): Promise<Account[]> => {
  try {
    const response = await AxiosConfiguration.get('/account/get/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching accounts...');
      const accountsData = await getUserAccounts(token);
      console.log('Accounts received:', accountsData);
      setAccounts(accountsData);
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof AxiosError && error.response) {
        setError(`Erreur: ${error.response.data.message}`);
      } else {
        setError('Erreur inconnue lors de la récupération des comptes.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAccounts();
    } else {
      setError('Token invalide ou expiré. Veuillez vous reconnecter.');
      setLoading(false);
    }
  }, [fetchAccounts, token]);

  const handleAddAccount = async (accountName: string) => {
    try {
      const newAccount = await addAccount(accountName, token);
      setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setError(`Erreur lors de l'ajout du compte: ${error.response.data.message}`);
      } else {
        setError("Erreur lors de l'ajout du compte.");
      }
    }
  };

  const handleAccountClick = (account: Account) => {
    navigate(`/transactions/${account.id}`);
  };

  if (loading) {
    return <div className="text-center text-xl">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Mes Comptes</h1>

        <AddAccountForm onAddAccount={handleAddAccount} />

        <div className="mt-6">
          {accounts.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {accounts.map((account) => (
                <li key={account.id}>
                  <AccountCard {...account} onClick={() => handleAccountClick(account)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">Aucun compte trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;