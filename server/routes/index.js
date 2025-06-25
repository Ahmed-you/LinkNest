import express from "express";
import authRouter from "./auth.js";
import dashboardRouter from "./dashboard.js";
const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/", dashboardRouter);

export default router;
