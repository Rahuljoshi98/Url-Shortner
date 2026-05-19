import express from "express";
import UserRoutes from "./user.js";
import UrlRoutes from "./url.js";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/url", UrlRoutes);

export default router;
