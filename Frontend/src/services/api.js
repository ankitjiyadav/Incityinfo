import axios from 'axios';

const api = axios.create({
  baseURL: 'https://incityinfo.onrender.com/api',
});

export default api;
