import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // שנה לכתובת ה-API שלך
});

export const fetchCodes = () => api.get("/codes");