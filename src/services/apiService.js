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

// =============================================================================
// AUTHENTICATION FUNCTIONS
// =============================================================================

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

// REGISTER FUNCTION - will be used in Register.js
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

// =============================================================================
// USER MANAGEMENT FUNCTIONS
// =============================================================================

// GET USER INFO FUNCTION - will be used in Dashboard.js and ProfilePage.js
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

// EDIT USER PROFILE FUNCTION - will be used in ProfilePage.js
export const editUserProfile = async (token, userData) => {
  const response = await fetch(`${API_BASE_URL}/user/edit`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};

// CHANGE PASSWORD FUNCTION - will be used in ProfilePage.js
export const changePassword = async (token, currentPassword, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/user/change_password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: currentPassword,
      new_password: newPassword
    })
  });
  return handleResponse(response);
};

// =============================================================================
// INSURANCE FUNCTIONS
// =============================================================================

// GET ALL INSURANCE PRODUCTS - will be used in InsurancePlans.js and Dashboard.js
export const getInsuranceProducts = async (token) => {
  const response = await fetch(`${API_BASE_URL}/insurance/products`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  return handleResponse(response);
};

// PAY FOR INSURANCE PRODUCT - will be used in InsurancePlans.js
export const payForInsurance = async (token) => {
  const response = await fetch(`${API_BASE_URL}/insurance/pay`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  return handleResponse(response);
};

// =============================================================================
// AI CHAT FUNCTIONS
// =============================================================================

// SEND MESSAGE TO AI - will be used in AIChatPage.js
export const sendChatMessage = async (token, message, language = 'en') => {
  const response = await fetch(`${API_BASE_URL}/chat/ask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      language: language
    })
  });
  return handleResponse(response);
};

// GET PERSONALIZED INSURANCE OPTIONS - will be used in AIChatPage.js and Dashboard.js
export const getPersonalizedOptions = async (token, message, language = 'en') => {
  const response = await fetch(`${API_BASE_URL}/chat/personalised_options`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      language: language
    })
  });
  return handleResponse(response);
};

// ============================================================================
// TOKEN MANAGEMENT FUNCTIONS (LOCAL STORAGE)
// =============================================================================

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

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// PING FUNCTION - to test if backend is working
export const pingBackend = async () => {
  const response = await fetch(`${API_BASE_URL}/ping`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return handleResponse(response);
};
