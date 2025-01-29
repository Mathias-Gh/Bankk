import { useState } from "react";
import axiosConfig from "../axiosConfig";
import VirementForm from "../components/VirementForm";
import toast from "react-hot-toast";

const Virement: React.FC = () => {
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
      const response = await axiosConfig.post("/transfer/", {
        from_iban_account: formData.fromIban,
        to_iban_account: formData.toIban,
        amount: parseFloat(formData.amount),
      });

      toast.success(response.data.message);
      setTransactionId(response.data.transaction_id);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Une erreur est survenue lors du virement.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Annulation d'une transaction
  const handleCancel = async () => {
    if (!transactionId) return;

    try {
      const response = await axiosConfig.post("/cancel_transaction/", {
        transaction_id: transactionId,
      });

      toast.success(response.data.message);
      setTransactionId(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Impossible d'annuler la transaction.";
      toast.error(errorMessage);
    }
  };

  return (
    <VirementForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      transactionId={transactionId}
      handleCancel={handleCancel}
      loading={loading}
    />
  );
};

export default Virement;