import express from "express";
import { UserController } from "../../../controller/index.js";
import { UserMiddleware } from "../../../middlewares/index.js";

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

export default router;
