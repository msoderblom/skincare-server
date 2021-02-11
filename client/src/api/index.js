import axios from "axios";

// create an axios instance with a base url
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const signUp = (formData) => API.post("/users/signup", formData);
