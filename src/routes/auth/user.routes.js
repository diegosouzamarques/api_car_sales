import express from "express";
import {authJwt}from "../../authEngine/index.js";
import userController from "../../controllers/auth/user.controller.js";

const userRoutes = express.Router();

userRoutes
.get("/all", userController.allAccess)
.get("/user", userController.userBoard)
.get("/mod", authJwt.isModerator, userController.moderatorBoard)
.get("/admin", authJwt.isAdmin, userController.adminBoard)

export default userRoutes;