// services/accountService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // L'URL de ton backend

export const getUserAccounts = async (token: string) => {
  const response = await axios.get(`${API_URL}/accounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addAccount = async (accountName: string, token: string) => {
  const response = await axios.post(
    `${API_URL}/accounts`,
    { account_name: accountName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};