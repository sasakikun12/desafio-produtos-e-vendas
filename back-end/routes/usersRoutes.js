const express = require("express");
const users = require("../controllers/users");
const verifyToken = require('../middleware/jwtMiddleware');

const usersRoutes = express.Router();

usersRoutes.post("/users", users.addUser);
usersRoutes.post("/users/login", users.loginUser);
usersRoutes.get("/users/:username", verifyToken, users.findUser);
usersRoutes.put("/users", verifyToken, users.updateUser);
usersRoutes.delete("/users/:username", verifyToken, users.deleteUser);

module.exports = usersRoutes;
