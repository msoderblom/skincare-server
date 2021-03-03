import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// create an axios instance with a base url
const API = axios.create({ baseURL: API_URL });

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

// Users
export const getAllUsers = (queryParams) => API.get(`/users${queryParams}`);

// Blog posts
export const getBlogPosts = (queryParams) =>
  API.get(`/blog/posts${queryParams}`);
export const getOneBlogPost = (id) => API.get(`/blog/posts/${id}`);
export const createBlogPost = (formData) =>
  API.post(`/blog/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Forum threads
export const getThreads = (queryParams) =>
  API.get(`/forum/threads${queryParams}`);
export const createThread = (formData) => API.post("/forum/threads", formData);
export const getOneThread = (id) => API.get(`/forum/threads/${id}`);

// Thread comments
export const getThreadComments = (threadID) =>
  API.get(`/forum/threads/${threadID}/comments`);
export const createComment = (formData, threadID) =>
  API.post(`/forum/threads/${threadID}/comments`, formData);

// Skinfluencers
export const getSkinfluencers = () => API.get(`/skinfluencers`);
export const createSkinfluencer = (formData) =>
  API.post(`/skinfluencers`, formData);
export const deleteSkinfluencer = (id) => API.delete(`/skinfluencers/${id}`);

// K-Beauty
export const getResellers = () => API.get(`/k-beauty/resellers`);
export const createReseller = (formData) =>
  API.post(`/k-beauty/resellers`, formData);
export const getBrands = () => API.get(`/k-beauty/brands`);
