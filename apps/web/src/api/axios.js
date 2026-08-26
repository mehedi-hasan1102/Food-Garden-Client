import axios from "axios";
import { auth } from "../context/firebase/firebase.config";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosSecure = axios.create({
  baseURL: BASE_URL,
});

// Attach the current Firebase user's ID token to every request.
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;
