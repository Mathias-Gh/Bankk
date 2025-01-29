import React from "react";

interface VirementFormProps {
  formData: {
    fromIban: string;
    toIban: string;
    amount: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  transactionId: number | null;
  handleCancel: () => void;
  loading: boolean;
}

const VirementForm: React.FC<VirementFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  transactionId,
  handleCancel,
  loading,
}) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Effectuer un Virement</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fromIban"
          placeholder="IBAN du compte source"
          value={formData.fromIban}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="toIban"
          placeholder="IBAN du compte destinataire"
          value={formData.toIban}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Montant"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Traitement..." : "Valider le Virement"}
        </button>
      </form>

      {transactionId && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">Transaction en attente de validation...</p>
          <button
            onClick={handleCancel}
            className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Annuler la transaction
          </button>
        </div>
      )}
    </div>
  );
};

export default VirementForm;