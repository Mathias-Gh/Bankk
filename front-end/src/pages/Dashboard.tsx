import '../App.css'
import NavBar from '../components/NavBar.tsx'
import UserMoneyChart from '../components/UserMoneyChart.tsx'

function Dashboard() {
  // Exemple de données et d'étiquettes
  const soldeData = [100, 200, 150, 300, 250]; // Remplacez par les données réelles de l'utilisateur
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']; // Remplacez par les étiquettes réelles
  const entreeData = [50, 100, 75, 150, 125]; // Remplacez par les données réelles des entrées
  const sortieData = [25, 50, 30, 75, 60]; // Remplacez par les données réelles des sorties

  return (
    <>
      <NavBar />
      <h1>Dashboard</h1>
      <select className="border border-gray-300 rounded-md p-2 mt-4 bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
        <option value="option1">Compte Principal</option>
      </select>
      <UserMoneyChart soldeData={soldeData} labels={labels} entreeData={entreeData} sortieData={sortieData} />
    </>
  )
}

export default Dashboard;
