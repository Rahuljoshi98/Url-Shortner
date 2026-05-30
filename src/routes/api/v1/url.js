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

router.get("/", AuthMiddleware.verifyUser, UrlController.getAllUrls);

router.get("/code/:shortCode", UrlController.getOriginalLink);

router.get(
  "/id/:id",
  AuthMiddleware.verifyUser,
  UrlMiddleware.validateGetUrlDetails,
  UrlController.getUrlDetails,
);

router.delete(
  "/:id",
  AuthMiddleware.verifyUser,
  UrlMiddleware.validateDeleteUrl,
  UrlController.deleteUrl,
);

export default router;
