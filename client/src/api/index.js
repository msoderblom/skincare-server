import axios from "axios";

// create an axios instance with a base url
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// a function that is going to happen before each request
API.interceptors.request.use((req) => {
  /* This is needed to send our token to the server so the middleware can verify that we are logged in*/

  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// User authorization
export const signUp = (formData) => API.post("/users/signup", formData);
export const signIn = (formData) => API.post("/users/signin", formData);

// Forum threads
export const getThreads = (queryParams) =>
  API.get(`/forum/threads${queryParams}`);
export const createThread = (formData) => API.post("/forum/threads", formData);
export const getOneThread = (id) => API.get(`/forum/threads/${id}`);
