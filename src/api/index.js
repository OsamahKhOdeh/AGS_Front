import axios from "axios";
console.log("From api");
const API = axios.create({ baseURL: "https://ags-server.onrender.com" });

//export const createProduct = (newProduct) => API.post("/products", newProduct);
export const createProduct = (newProduct) => axios.post("https://server1-ustg.onrender.com/products", newProduct);

export const fetchProducts = (page) => API.get(`/products?page=${page}`);

export const fetchFilteredProducts = (filters) => API.get(`/products/search?categories=${filters.categories || ""}&countries=${filters.countries || ""}&companies=${filters.companies || ""}&brands=${filters.brands || ""}&capacities=${JSON.stringify(filters.capacities) || ""}`);

export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);

/*
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); 
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
*/
