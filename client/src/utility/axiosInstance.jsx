import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true // 🔥 This is required to send/receive cookies
});

export default axiosInstance;
