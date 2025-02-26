
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  }
};

export const ideaService = {
  createIdea: async (title: string, description: string) => {
    const response = await api.post("/ideas", { title, description });
    return response.data;
  },

  getIdeas: async () => {
    const response = await api.get("/ideas");
    return response.data;
  },

  voteIdea: async (ideaId: string) => {
    const response = await api.post(`/ideas/${ideaId}/vote`);
    return response.data;
  },

  commentIdea: async (ideaId: string, text: string) => {
    const response = await api.post(`/ideas/${ideaId}/comment`, { text });
    return response.data;
  }
};
