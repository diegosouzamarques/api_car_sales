import express from "express";
import authController from "../../controllers/auth/auth.controller.js";
import {verifySignUp} from "../../authEngine/index.js"

const authRoutes = express.Router();

authRoutes
.post("/signup",[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup)
.post("/signin", authController.signin)
.post("/refreshtoken", authController.refreshToken);
   
export default authRoutes;