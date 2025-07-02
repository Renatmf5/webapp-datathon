
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.grupo-ever-rmf.com/api/v1/';

console.log('NEXT_PUBLIC_API_BASE_URL:', API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchDataMetrics = async () => {
  try {
    const response = await api.get('callBacktests/getMetrics');
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};

export const fetchCarteirasFactor = async () => {
  try {
    const response = await api.get('callBacktests/getCarteiras');
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};

export const getPredicts = async (ticker: string) => {
  try {
    // Inclui o ticker no caminho da URL
    const response = await api.get(`callPredicts/Predict/${ticker}`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};


