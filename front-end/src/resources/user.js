import api from "../services/api";

const signIn = (user) => api.post("/users/login", user);

const createUser = (user) => api.post("/users", user);

export { signIn, createUser };
