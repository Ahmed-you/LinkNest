import express from "express";
import * as categoriesController from "../controllers/categories.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/categories", verifyJWT, categoriesController.getCategories);
router.post("/categories", verifyJWT, categoriesController.createCategory);
router.put("/categories/:id", verifyJWT, categoriesController.updateCategory);
router.delete("/categories/:id", verifyJWT, categoriesController.deleteCategory);

export default router;
