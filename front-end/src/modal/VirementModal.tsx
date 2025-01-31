import { useState } from "react";
import AxiosConfiguration from "../AxiosConfiguration";
import toast from "react-hot-toast";

interface VirementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirementModal: React.FC<VirementModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fromIban: "",
    toIban: "",
    amount: "",
  });

  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire de virement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosConfiguration.post("/transfer/", {
        from_iban_account: formData.fromIban,
        to_iban_account: formData.toIban,
        amount: parseFloat(formData.amount),
      });

      toast.success(response.data.message);
      setTransactionId(response.data.transaction_id);
      onClose(); // Fermer la pop-up après succès
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || "Une erreur s'est produite. Veuillez réessayer.",
        {
          duration: 4000,
          position: 'top-center',
          style: {
            backgroundColor: '#f44336',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px'
          }
        }
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Ne pas afficher la pop-up si elle est fermée

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Effectuer un virement</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fromIban"
            placeholder="IBAN source"
            value={formData.fromIban}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="toIban"
            placeholder="IBAN destinataire"
            value={formData.toIban}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Montant"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? "En cours..." : "Valider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VirementModal;