import React, { useEffect } from "react";
import BeneficiaryForm from "../components/BeneficiaryForm";

const BeneficiaryModal: React.FC<{ formData: any, handleChange: any, handleSubmit: any, errors: any, onClose: any }> = ({ formData, handleChange, handleSubmit, errors, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 id="modal-title" className="text-2xl font-bold text-center mb-4">Ajouter un bénéficiaire</h2>
        <BeneficiaryForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} />
        <button
          type="button"
          onClick={onClose}
          className="mt-4 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring focus:ring-gray-300"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryModal;
