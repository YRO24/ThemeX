// API Configuration
const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Get user from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  signup: (userData) => 
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getProfile: () => 
    apiCall('/auth/profile'),
  
  updateProfile: (profileData) => 
    apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};

// Projects API
export const projectsAPI = {
  getAll: () => 
    apiCall('/projects'),
  
  getRecent: () => 
    apiCall('/projects/recent'),
  
  getTrash: () => 
    apiCall('/projects/trash'),
  
  create: (projectData) => 
    apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),
  
  update: (projectId, projectData) => 
    apiCall(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    }),
  
  delete: (projectId) => 
    apiCall(`/projects/${projectId}`, {
      method: 'DELETE',
    }),
  
  restore: (projectId) => 
    apiCall(`/projects/${projectId}/restore`, {
      method: 'PATCH',
    }),
  
  permanentDelete: (projectId) => 
    apiCall(`/projects/${projectId}/permanent`, {
      method: 'DELETE',
    }),
};

// Cart API
export const cartAPI = {
  get: () => 
    apiCall('/cart'),
  
  add: (item) => 
    apiCall('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    }),
  
  remove: (themeId) => 
    apiCall(`/cart/${themeId}`, {
      method: 'DELETE',
    }),
  
  clear: () => 
    apiCall('/cart', {
      method: 'DELETE',
    }),
  
  checkout: (checkoutData) => 
    apiCall('/cart/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    }),
};

// Wishlist API
export const wishlistAPI = {
  get: () => 
    apiCall('/wishlist'),
  
  add: (item) => 
    apiCall('/wishlist', {
      method: 'POST',
      body: JSON.stringify(item),
    }),
  
  remove: (themeId) => 
    apiCall(`/wishlist/${themeId}`, {
      method: 'DELETE',
    }),
  
  toggleFavorite: (themeId) => 
    apiCall(`/wishlist/${themeId}/favorite`, {
      method: 'PATCH',
    }),
  
  moveToCart: (themeId) => 
    apiCall(`/wishlist/${themeId}/move-to-cart`, {
      method: 'POST',
    }),
};

// History API
export const historyAPI = {
  get: () => 
    apiCall('/history'),
  
  getById: (orderId) => 
    apiCall(`/history/${orderId}`),
  
  getStats: () => 
    apiCall('/history/stats/summary'),
  
  requestRefund: (orderId) => 
    apiCall(`/history/${orderId}/refund`, {
      method: 'PATCH',
    }),
};

// Helper functions
export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserInfo = () => {
  return getUser();
};

export default {
  authAPI,
  projectsAPI,
  cartAPI,
  wishlistAPI,
  historyAPI,
  isAuthenticated,
  getUserInfo,
};