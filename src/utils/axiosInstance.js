import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://mern-social-backend-a0aa.onrender.com/api",
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://mern-social-backend-eight.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token from local storage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
