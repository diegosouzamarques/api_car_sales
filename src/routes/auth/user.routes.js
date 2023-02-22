import express from "express";
import {authJwt}from "../../authEngine/index.js";
import userController from "../../controllers/auth/user.controller.js";

const userRoutes = express.Router();

userRoutes
.get("/test/all", userController.allAccess)
.get("/test/user",[authJwt.verifyToken], userController.userBoard)
.get("/test/mod",[authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard)
.get("/test/admin",[authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard)

export default userRoutes;