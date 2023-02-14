import { config } from 'dotenv';
config();

const { create } = require('axios');
const axios = create({
  baseURL: process.env.BASE_URL,
});
axios.interceptors.request.use((config) => {
  config.params = {
    id: window.sessionStorage.getItem('id'),
  };
  return config;
});

export default axios;
