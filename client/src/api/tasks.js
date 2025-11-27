import { api } from "./api";

// Fetch all tasks
export const getTasks = async () => (await api.get("/tasks")).data;

// Create a new task
export const createTask = async (task) => (await api.post("/tasks", task)).data;

// Update an existing task
export const updateTask = async (id, updates) => (await api.put(`/tasks/${id}`, updates)).data;

// Delete a task
export const deleteTask = async (id) => (await api.delete(`/tasks/${id}`)).data;
