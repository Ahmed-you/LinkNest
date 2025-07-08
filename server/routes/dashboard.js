import express from "express";
import * as dashboardController from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();
router.get("/dashboard", verifyJWT, dashboardController.getDashboard);

export default router;
