import * as categoriesQueries from "../database/queries/categories.js";
import Joi from "joi";

const createCategorySchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\p{L}\p{N}_\- ]{2,30}$/u)

    .messages({
      "string.empty": "Category name is required.",
      "string.pattern.base":
        "Category name must be 2–30 characters and only use letters, numbers, spaces, - or _.",
    }),
  icon: Joi.string().min(1).max(20).messages({
    "string.empty": "Icon is required.",
  }),
  color: Joi.string().min(3).max(15).messages({
    "string.empty": "Color is required.",
  }),
});

// Get All Categories
export const getCategories = (req, res) => {
  const user_id = req.user.id;

  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing user ID." });
  }

  categoriesQueries
    .getCategories(user_id)
    .then((categories) => {
      res.status(200).json({ categories });
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Server error fetching categories." });
    });
};
// Create a New Category
export const createCategory = (req, res) => {
  const user_id = req.user.id;
  const { name, icon, color } = req.body;
  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing user ID." });
  }

  //validtae data
  const { error, value } = createCategorySchema.validate({ name, icon, color });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  categoriesQueries
    .createCategory({ user_id: userId, ...value })
    .then((result) => {
      res.status(201).json({ category: result.rows[0] });
    })
    .catch((error) => {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Server error creating category." });
    });
};

export const updateCategory = (req, res) => {
  const user_id = req.user.id;
  const category_id = req.params.id;
  const { name, icon, color } = req.body;
  // validate Ids and category existents
  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing user ID." });
  }
  if (!category_id) {
    return res.status(400).json({ error: "Invalid or missing category ID." });
  }
  categoriesQueries
    .getCategoryById(category_id, user_id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category Not Found " });
      }

      if (category.user_id !== user_id) {
        return res
          .status(403)
          .json({ error: "Not Authorized to edit this Category" });
      }

      //validtae data
      const { error, value } = createCategorySchema.validate({
        name,
        icon,
        color,
      });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      return categoriesQueries.updateCategory({
        category_id,
        user_id,
        ...value,
      });
    })
    .then((categoryResult) => {
      res.status(201).json({
        message: "category Updated",
        category: categoryResult.rows[0],
      });
    })
    .catch((error) => {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Server error creating category." });
    });
};

export const deleteCategory = (req, res) => {
  const user_id = req.user.id;
  const category_id = req.params.id;

  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing user ID." });
  }
  if (!category_id) {
    return res.status(400).json({ error: "Invalid or missing category ID." });
  }
  categoriesQueries
    .deleteCategory(category_id, user_id)
    .then(() => {
      res.status(201).json({
        message: "category Deleted",
      });
    })
    .catch((error) => {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Server error creating category." });
    });
};
