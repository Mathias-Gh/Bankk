import { useState } from "react";
import VirementModal from "../modal/VirementModal";

const Transactions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Transactions</h1>

      {/* Bouton pour ouvrir la pop-up */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Effectuer un virement
      </button>

      {/* Pop-up de virement */}
      <VirementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Transactions;