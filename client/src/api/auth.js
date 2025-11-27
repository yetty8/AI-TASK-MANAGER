import { api } from "./api.js";

export const registerUser = (userData) => api.post("/auth/register", userData).then(res => res.data);
export const loginUser = (userData) => api.post("/auth/login", userData).then(res => res.data);
