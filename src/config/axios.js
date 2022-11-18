import {v4} from 'uuid';

const {create} = require('axios');
const axios = create({
  baseURL: 'http://localhost:3000/api/',
});

axios.interceptors.request.use((config) => {
  if (!window.sessionStorage.getItem('id')) {
    console.log('NEW ID');
    window.sessionStorage.setItem('id', v4());
  }
  config.params = {
    id: window.sessionStorage.getItem('id'),
  };
  return config;
});

export default axios;
