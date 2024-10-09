import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4444/api", // Replace with your backend URL
});

export const fetchTransactions = (params) =>
  api.get("/transactions", { params });
export const fetchStatistics = (params) => api.get("/statistics", { params });
export const fetchBarChartData = (params) => api.get("/barchart", { params });
export const fetchPieChartData = (params) => api.get("/piechart", { params });
export const fetchCombinedData = (params) => api.get("/combined", { params });
