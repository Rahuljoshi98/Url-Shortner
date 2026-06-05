import express from "express";
import { UserController } from "../../../controller/index.js";
import { AuthMiddleware, UserMiddleware } from "../../../middlewares/index.js";

const router = express.Router();

router.post(
  "/register",
  UserMiddleware.validateCreateRequest,
  UserController.createUser,
);

router.post(
  "/login",
  UserMiddleware.validateLoginRequest,
  UserController.loginUser,
);

router.post("/logout", AuthMiddleware.verifyUser, UserController.logoutUser);

export default router;
