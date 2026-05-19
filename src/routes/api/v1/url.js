import express from "express";
import { UrlController } from "../../../controller/index.js";
import { AuthMiddleware } from "../../../middlewares/index.js";

const router = express.Router();

router.post("/", AuthMiddleware.verifyUser, UrlController.createShortUrl);

export default router;
