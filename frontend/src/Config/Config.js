import axios from "axios";

export const httpGet = axios.create({
  baseURL: "http://localhost:3344",
  headers: {
    "Content-type": "application/json",
  },
});

export const httpPost = axios.create({
  baseURL: "http://localhost:3344",
  headers: {
    "Content-type": "application/json",
  },
});
