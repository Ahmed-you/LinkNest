import express from "express";
import authRouter from "./auth.js";
import dashboardRouter from "./dashboard.js";
import categoriesRouter from "./categories.js";
import linksRouter from "./links.js";
const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api", dashboardRouter);
router.use("/api", categoriesRouter);
router.use("/api", linksRouter);

export default router;
