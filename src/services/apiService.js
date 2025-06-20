// Functions to communicate with backend
import API_BASE_URL from '../config/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// LOGIN FUNCTION - will be used in Login.js
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: email, // Backend expects 'username' but we're sending email
      password: password,
      grant_type: 'password'
    })
  });
  return handleResponse(response);
};

// REGISTER FUNCTION - will be used in Register.js later
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};

// GET USER INFO FUNCTION - will be used in Dashboard.js later
export const getUserInfo = async (token) => {
  const response = await fetch(`${API_BASE_URL}/user/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  return handleResponse(response);
};

// FUNCTIONS TO MANAGE LOGIN TOKEN (store in browser)
export const saveToken = (token) => {
  localStorage.setItem('access_token', token);
};

export const getToken = () => {
  return localStorage.getItem('access_token');
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('access_token');
};
