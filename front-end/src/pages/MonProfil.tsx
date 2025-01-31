import { useState } from "react";
import AxiosConfiguration from '../AxiosConfiguration';
import NavBar from '../components/NavBar.tsx';


const ChangePassword = () => {
  const [current_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (new_password !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      await AxiosConfiguration.post("/auth/change/password", {
        current_password,
        new_password,
      });

      setMessage("Mot de passe mis à jour avec succès !");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Erreur lors de la mise à jour du mot de passe.");
    }
  };
  return (
    <>
    <NavBar />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Modifier le mot de passe</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleChangePassword} className="space-y-4">
        <input
          type="password"
          placeholder="Ancien mot de passe"
          className="w-full p-2 border rounded"
          value={current_password}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-2 border rounded"
          value={new_password}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Modifier le mot de passe
        </button>
      </form>
    </div>
    </>
  );
};

export default ChangePassword;