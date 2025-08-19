// src/api.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
