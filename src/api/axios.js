
import axios from 'axios';
import { auth } from '../context/firebase/firebase.config';

const axiosSecure = axios.create({
  baseURL: 'https://food-garden-server-bd.vercel.app',
});

// Add a request interceptor
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosSecure;
