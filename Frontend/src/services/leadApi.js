import axios from 'axios';

const API = axios.create({
  baseURL: 'https://incityinfo.onrender.com/api',
});

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API Calls
export const getLeads = () => API.get('/leads');
export const addLead = (data) => API.post('/leads', data);
export const editAddress = (id, address) => API.patch(`/leads/${id}/address`, { address });
export const deleteLead = (id) => API.delete(`/leads/${id}`);
export const updateStatus = (id, statusData) => API.patch(`/leads/${id}/status`, statusData);
