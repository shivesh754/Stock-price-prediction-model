import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const stockService = {
  // Fetch Historical Data
  getHistoricalData: async (symbol, startDate, endDate) => {
    try {
      const response = await api.get('/historical', {
        params: { symbol, start: startDate, end: endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },

  // Perform Prediction
  predictStock: async (symbol, days, model) => {
    try {
      const response = await api.post('/predict', {
        symbol,
        days: parseInt(days),
        model
      });
      return response.data;
    } catch (error) {
      console.error('Error predicting stock:', error);
      throw error;
    }
  },

  // Get Available Models
  getModels: async () => {
    try {
      const response = await api.get('/models');
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }
};
