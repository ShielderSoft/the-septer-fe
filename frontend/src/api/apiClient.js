const BASE_URL = 'http://127.0.0.1:8000';

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    method: 'GET',
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

const requestWithFile = async (endpoint, formData, token) => {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

// --- API Functions ---

// Auth
export const login = (credentials) => request('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const guardianLogin = (credentials) => request('/api/g-login/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

// Hunter
export const signup = (userData) => request('/api/hunter/signup', {
  method: 'POST',
  body: JSON.stringify(userData),
});

export const addApiKey = (apiKey, token) => request('/api/hunter/add-api-key', {
  method: 'PUT',
  body: JSON.stringify({ api_key: apiKey }),
  headers: { 'Authorization': `Bearer ${token}` },
});

// Logs
export const uploadLog = (formData, token) => requestWithFile('/api/logs/upload', formData, token);

export const askQuestion = (data, token) => request('/api/logs/ask', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Authorization': `Bearer ${token}` },
});

// Guardian
export const getGuardianDashboard = (token) => request('/api/guardian/dashboard', {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` },
});