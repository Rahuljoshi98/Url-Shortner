import express from "express";
import { UrlController } from "../../../controller/index.js";
import { AuthMiddleware, UrlMiddleware } from "../../../middlewares/index.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyUser,
  UrlMiddleware.validateCreateRequest,
  UrlController.createShortUrl,
);

export default router;
