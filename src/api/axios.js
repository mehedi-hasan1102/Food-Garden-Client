
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://food-garden-server-bd.vercel.app', // Your backend URL
  withCredentials: true,
});

export default axiosSecure;
