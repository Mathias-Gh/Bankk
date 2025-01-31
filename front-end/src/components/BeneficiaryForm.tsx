import React from "react";
import { BeneficiaryFormProps } from "../type/BeneficiaryType";

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({ formData, handleChange, handleSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Nom"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="iban" className="block text-sm font-medium text-gray-700">IBAN</label>
        <input
          id="iban"
          type="text"
          name="iban"
          value={formData.iban}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="IBAN"
        />
        {errors.iban && <p className="text-red-500 text-sm">{errors.iban}</p>}
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default BeneficiaryForm;
