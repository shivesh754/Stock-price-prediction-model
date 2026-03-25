import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Interceptor: attach JWT token to every request ────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('stocksight_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Interceptor: handle 401 responses (auto logout) ───────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear session
      localStorage.removeItem('stocksight_token');
      localStorage.removeItem('stocksight_user');
      // Optionally redirect to login
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Stock Services ────────────────────────────────────────────────────────────

export const stockService = {
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

// ─── Auth Services ─────────────────────────────────────────────────────────────

export const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  googleAuth: async (credential) => {
    const response = await api.post('/auth/google', { credential });
    return response.data;
  },

  githubAuth: async (accessToken) => {
    const response = await api.post('/auth/github', { access_token: accessToken });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/me', data);
    return response.data;
  },
};

export default api;
