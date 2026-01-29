import axios from 'axios';

// Backend base URL (comes from env in production)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
