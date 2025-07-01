import express from "express";
import * as linksController from "../controllers/links.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/links/:categoryId", verifyJWT, linksController.getLinksByCategory);
router.post("/links/:categoryId", verifyJWT, linksController.createLink);
router.put("/links/:id", verifyJWT, linksController.updateLink);
router.delete("/links/:id", verifyJWT, linksController.deleteLink);

export default router;
