import axios from "axios";

const url = 'http://127.0.0.1:8000/api/v1';

export const api = axios.create({
  baseURL: url
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});