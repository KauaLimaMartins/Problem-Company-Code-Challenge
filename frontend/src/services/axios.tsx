import axios from "axios";

export const api = axios.create({
  baseURL: "http://problem-api:8000",
});
