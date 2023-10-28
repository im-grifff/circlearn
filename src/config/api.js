import axios from 'axios';

// Menyimpan url endpoint untuk request ke back-end
const api = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: 'https://circlearn-back-end.up.railway.app'
});

export default api;
