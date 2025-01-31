import axios from 'axios'; // Importer axios
import AxiosConfiguration from '../AxiosConfiguration';
import { AxiosError } from 'axios';

const API_URL = 'http://localhost:8000'; // Assurez-vous que l'URL est correcte

export const getTransactions = async (token: string) => {
  try {
    const response = await AxiosConfiguration.get(
      `${API_URL}/transactions/get/all`, // Mise à jour de l'URL pour correspondre à la route backend
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('API Response:', response); // Log de la réponse complète
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(`Erreur lors de la récupération des transactions: ${error.response.data.message}`);
    } else {
      console.error('Unexpected Error:', error);
      throw new Error("Erreur inattendue lors de la récupération des transactions.");
    }
  }
};

// Définir le type TransferRequest
interface TransferRequest {
  account_iban_from: string;
  account_iban_to: string;
  amount: number;
  transaction_note: string;
}

export const transferFunds = async (token: string, transferData: TransferRequest) => {
  const response = await axios.post(`${API_URL}/transactions/transfer`, transferData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const cancelTransaction = async (token: string, transactionId: number) => {
  const response = await axios.post(`${API_URL}/transactions/cancel`, { transaction_id: transactionId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};