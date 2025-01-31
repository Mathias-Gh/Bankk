import { useEffect, useState } from 'react';
import '../App.css';
import AxiosConfiguration from '../AxiosConfiguration';
import NavBar from '../components/NavBar.tsx';
import UserMoneyChart from '../components/UserMoneyChart.tsx';

interface AccountData {
  balance: number[];
  labels: string[];
  entree: number[];
  sortie: number[];
}

function Dashboard() {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosConfiguration.get<AccountData>('/account/get/all');
        console.log("Données reçues :", response.data);
        setData(response.data);
      } catch (err: any) {
        if (err.response) {
          setError(`Erreur ${err.response.status} : ${err.response.data.message || "Problème inconnu"}`);
        } else if (err.request) {
          setError("Le serveur ne répond pas. Vérifiez votre connexion.");
        } else {
          setError("Une erreur est survenue : " + err.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <>
      <NavBar />
      <h1>Dashboard</h1>

      <select className="border border-gray-300 rounded-md p-2 mt-4 bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
        <option value="option1">Compte Principal</option>
        <option value="option2">Compte Secondaire</option>
        <option value="option3">Compte Tertiaire</option>
      </select>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {loading && <p className="text-gray-500 mt-4">Chargement...</p>}

      {data && (
        <UserMoneyChart
          soldeData={data.balance}
          labels={data.labels}
          entreeData={data.entree}
          sortieData={data.sortie}
        />
      )}
    </>
  );
}

export default Dashboard;
