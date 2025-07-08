import * as linksQueries from "../database/queries/links.js";
import Joi from "joi";

export const linkSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least 1 characters.",
    "string.max": "Title can't be more than 100 characters.",
  }),

  url: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required()
    .messages({
      "string.empty": "URL is required.",
      "string.uri": "Must be a valid URL starting with http:// or https://",
    }),

  tags: Joi.array().items(Joi.string().max(20)).max(10).messages({
    "array.max": "You can add up to 10 tags.",
    "string.max": "Each tag must be 20 characters or less.",
  }),
}).options({ allowUnknown: false });

// get All Links within a category
export const getLinksByCategory = (req, res) => {
  const user_id = req.user.id;
  const category_id = req.params.categoryId;
  console.log(category_id);

  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing user ID." });
  }
  if (!category_id || isNaN(category_id)) {
    return res.status(400).json({ error: "Invalid or missing category ID." });
  }

  linksQueries
    .getLinksByCategory(category_id, user_id)
    .then((result) => {
      res.status(200).json({ links: result });
    })
    .catch((error) => {
      console.error("Error getting links:", error);
      res.status(500).json({ error: "Server error creating links." });
    });
};

// create a new link in a category
export const createLink = (req, res) => {
  const user_id = req.user.id;
  const category_id = Number(req.params.categoryId);

  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing user ID." });
  }
  if (!category_id || isNaN(category_id)) {
    return res.status(400).json({ error: "Invalid or missing category ID." });
  }

  const { error, value } = linkSchema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  linksQueries
    .createLink({ user_id, category_id, ...value })
    .then((result) => {
      res.status(201).json({ link: result.rows[0] });
    })
    .catch((error) => {
      console.error("Error creating link:", error);
      res.status(500).json({ error: "Server error creating link." });
    });
};

// Update a link in a category
export const updateLink = (req, res) => {
  const user_id = req.user.id;

  const link_id = req.params.id;
  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({
      error: "Invalid or missing user ID.",
      id: user_id,
    });
  }
  if (!link_id) {
    return res.status(400).json({ error: "Invalid or missing link ID." });
  }
  const { error, value } = linkSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  linksQueries
    .updateLink({ user_id, link_id, ...value })
    .then((result) => {
      res.status(201).json({ updatedLink: result.rows[0] });
    })
    .catch((error) => {
      console.error("Error updating link:", error);
      res.status(500).json({ error: "Server error updating link." });
    });
};
export const deleteLink = (req, res) => {
  const user_id = req.user.id;
  const link_id = Number(req.params.id);

  if (!user_id || typeof user_id !== "number") {
    return res.status(400).json({
      error: "Invalid or missing user ID.",
    });
  }
  if (!link_id) {
    return res.status(400).json({ error: "Invalid or missing link ID." });
  }
  linksQueries
    .deleteLink({ link_id, user_id })
    .then(() => {
      res.status(201).json({ message: `Link With Id:${link_id} Deleted` });
    })
    .catch((error) => {
      console.error("Error deleting link:", error);
      res.status(500).json({ error: "Server error deleting link." });
    });
};
