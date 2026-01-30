import axios from 'axios';

const api = axios.create({
  baseURL: 'https://job-application-tracker-wpbq.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
