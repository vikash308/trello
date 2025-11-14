import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const createTask = (payload) =>
    axios.post(`${API}/api/tasks`, payload).then((r) => r.data);

export const updateTask = (id, payload) =>
    axios.put(`${API}/api/tasks/${id}`, payload).then((r) => r.data);

export const deleteTask = (id) =>
    axios.delete(`${API}/api/tasks/${id}`).then((r) => r.data);
