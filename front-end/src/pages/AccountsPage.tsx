// pages/AccountsPage.tsx
import React, { useEffect, useState } from 'react';
import { getUserAccounts, addAccount } from '../api/AccountService'; // Service API pour gérer les comptes
import AccountCard from '../components/AccountCard';
import AddAccountForm from '../components/AddAccountForm';
import AccountDetails from '../components/AccountDetails';

interface Account {
  id: number;
  name: string;
  iban: string;
  balance: number;
  status: boolean;
  main: boolean;
}

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const token = 'ton_token_jwt'; // Remplacer par le token JWT de l'utilisateur connecté

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const accountsData = await getUserAccounts(token); // Récupérer les comptes via le service API
        setAccounts(accountsData);
      } catch (error) {
        setError('Erreur lors de la récupération des comptes.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [token]);

  const handleAddAccount = async (accountName: string) => {
    try {
      const newAccount = await addAccount(accountName, token); // Ajouter un compte via le service API
      setAccounts([...accounts, newAccount]); // Ajouter le nouveau compte à l'état
    } catch (error) {
      setError('Erreur lors de l\'ajout du compte.');
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 p-8">
      <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg flex-grow">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Mes Comptes</h1>

        <AddAccountForm onAddAccount={handleAddAccount} />

        {selectedAccount ? (
          <AccountDetails {...selectedAccount} />
        ) : (
          <div className="mt-6">
            {accounts.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {accounts.map((account) => (
                  <li key={account.id}>
                    <AccountCard
                      {...account}
                      onClick={() => setSelectedAccount(account)} // Lors du clic, afficher les détails du compte
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-500">Aucun compte trouvé.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;