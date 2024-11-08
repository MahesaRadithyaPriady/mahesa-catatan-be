const express = require("express");
const Route = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

Route.get("/users/", authController.getUsers);
Route.post("/auth/login", authController.login);
Route.post("/users/", authController.storeUser);
Route.post("/auth/verify", authMiddleware.jwtVerify, authController.jwtVerify);

module.exports = Route;
