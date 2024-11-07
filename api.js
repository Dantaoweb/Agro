import axios from 'axios';

// Set the base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach token to each request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = Bearer ${token};
  }
  return config;
});

// Example functions for each user role
const apiService = {
  // Farmer
  submitBusinessPlan: (data) => api.post('/farmer/submit_plan', data),
  updateBusinessPlan: (planId, updates) => api.put(/farmer/update_plan/${planId}, updates),
  
  // Validator
  setValidationFees: (data) => api.post('/validator/set_fees', data),
  validateTask: (taskId) => api.post(/validator/validate_task/${taskId}),
  
  // Consultant
  quoteConsultationFee: (planId, fee) => api.post(/consultant/quote_fee/${planId}, { fee }),
  approvePlan: (planId) => api.post(/consultant/approve_plan/${planId}),
  
  // Admin
  releaseFunds: (projectId) => api.post(/admin/release_funds/${projectId}),
  
  // Notifications
  getNotifications: () => api.get('/notifications'),
};

export default apiService;