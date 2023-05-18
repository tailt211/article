import axios from "axios";
import { getLocalToken } from "../utils/storage";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return true;
  },
});

API.interceptors.response.use(
  (response) => {
    if (response.status !== 200 && response.status !== 201) {
      console.log("catch error: ", response, response.data.detail);
    }
    return response;
  },
  (error) => {
    console.warn("Error status: ", error.response.status);
  }
);

API.interceptors.request.use((request) => {
  const token = getLocalToken();
  if (token) request.headers.Authorization = "Bearer " + token;
  return request;
});

export function standardResponse(success: any, message: any) {
  return {
    success,
    message,
  };
}
