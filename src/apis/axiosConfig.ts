import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token',
)}`;
