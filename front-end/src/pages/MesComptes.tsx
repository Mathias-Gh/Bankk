import React, { useEffect, useState } from 'react';
import axiosConfig from '../axiosConfig';  // Fichier axios de configuration

const MesComptes: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);  // Stocke les comptes
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string>(''); // Stocke un éventuel message d'erreur

  // Fonction pour récupérer les comptes
  const fetchAccounts = async () => {
    try {
      // Envoi de la requête pour récupérer les comptes de l'utilisateur
      const { data } = await axiosConfig.get(`/listAccount`, {
        withCredentials: true,  // Important : cela envoie les cookies avec la requête
      });

      setAccounts(data); // Stocke les comptes récupérés
      setLoading(false); // On arrête le chargement
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des comptes.');
      setLoading(false);
    }
  };
  // Appel de la fonction lors du chargement du composant
  useEffect(() => {
    fetchAccounts();
  }, []);

  // Rendu du composant
  return (
    <div>
      <h2>Liste de mes comptes</h2>

      {loading && <p>Chargement des comptes...</p>}  {/* Affichage pendant le chargement */}

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Affichage d'erreur si nécessaire */}

      {!loading && !error && accounts.length === 0 && <p>Aucun compte trouvé.</p>}  {/* Si aucun compte n'est trouvé */}

      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <strong>{account.account_name}</strong> - IBAN: {account.iban_account} - Solde: {account.money_value}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MesComptes;