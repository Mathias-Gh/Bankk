import AxiosConfiguration from '../AxiosConfiguration'; // Import du fichier AxiosConfiguration.ts
import Axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8000'; // Ajustez l'URL si nécessaire

export const addAccount = async (accountName: string, token: string) => {
  try {
    const response = await AxiosConfiguration.post(
      `${API_URL}/account/create`, // Assurez-vous que l'URL est correcte
      { account_name: accountName }, // Corps de la requête
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
      throw new Error(`Erreur lors de l'ajout du compte: ${error.response.data.message}`);
    } else {
      console.error('Unexpected Error:', error);
      throw new Error("Erreur inattendue lors de l'ajout du compte.");
    }
  }
};

export const getAccounts = async (token: string): Promise<Account[]> => {
  try {
    const response = await AxiosConfiguration.get(
      `${API_URL}/account/get/all`, // Assurez-vous que l'URL est correcte
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(`Erreur lors de la récupération des comptes: ${error.response.data.message}`);
    } else {
      console.error('Unexpected Error:', error);
      throw new Error("Erreur inattendue lors de la récupération des comptes.");
    }
  }
};

// Define the Account interface if not already defined
interface Account {
  id: string;
  name: string;
  iban: string;
}