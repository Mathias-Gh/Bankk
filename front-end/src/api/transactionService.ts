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