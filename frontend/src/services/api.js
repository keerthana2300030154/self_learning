import axios from "axios";

const API = "http://127.0.0.1:8001";

// Add Log
export const addLog = async (data) => {
  return await axios.post(`${API}/logs/`, data);
};

// Get Logs
export const getLogs = async () => {
  return await axios.get(`${API}/logs/`);
};

// Get Alerts
export const getAlerts = async () => {
  return await axios.get(`${API}/detect/`);
};

// 🔥 ADD THIS (MISSING FUNCTION)
export const resetLogs = async () => {
  return await axios.delete(`${API}/reset/`);
};