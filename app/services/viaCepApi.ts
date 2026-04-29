import axios from 'axios';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  timeout: 5000, 
});

export default api;