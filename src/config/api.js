import axios from 'axios';

// Menyimpan url endpoint untuk request ke back-end
const api = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
