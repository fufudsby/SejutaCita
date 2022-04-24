import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: `https://asia-southeast2-sejutacita-app.cloudfunctions.net/`
});

export default axiosConfig;