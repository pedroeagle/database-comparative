import { config } from 'dotenv';
config();

const { create } = require('axios');
const axios = create({
  baseURL: process.env.BASE_URL,
});
axios.interceptors.request.use((config) => {
  console.log('ID')
  console.log(window.sessionStorage.getItem('id'))
  console.log(!window.sessionStorage.getItem('id'))
  config.params = {
    id: window.sessionStorage.getItem('id'),
  };
  return config;
});

export default axios;
