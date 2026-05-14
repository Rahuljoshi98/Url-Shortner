import express from "express";
import { UserController } from "../../../controller/index.js";
import { UserMiddleware } from "../../../middlewares/index.js";

const router = express.Router();

router.post(
  "/",
  UserMiddleware.validateCreateRequest,
  UserController.createUser,
);

export default router;
