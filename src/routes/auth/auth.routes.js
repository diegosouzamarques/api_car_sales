import express from "express";
import authController from "../../controllers/auth/auth.controller.js";
import {verifySignUp} from "../../authEngine/index.js"

const authRoutes = express.Router();

authRoutes
.post("/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],authController.signup)
.post("/auth/signin", authController.signin)
.post("/auth/refreshtoken", authController.refreshToken);
   
export default authRoutes;