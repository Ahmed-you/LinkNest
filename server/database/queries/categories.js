import pool from "../config/connection";

// Create category
export const createCategory = ({ user_id, name, icon, color }) => {
  const values = [user_id, name, icon, color];
  const query = `
        INSERT INTO categories (user_id, name, icon, color)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;
  return pool.query(query, values);
};

// Get all categories from this user
export const getCategories = (user_id) => {
  return pool.query(
    `   SELECT * FROM categories 
        WHERE user_id = $1
        ORDER BY created_at DESC;`,
    [user_id]
  );
};

// Get a selected category from this user
export const getCategoryById = (category_id, user_id) => {
  const query = `
       SELECT * FROM categories
       WHERE id = $1 AND user_id = $2;`;
  return pool.query(query, [category_id, user_id]);
};

// Edit a selected category from this user
export const editCategory = ({ category_id, user_id, name, icon, color }) => {
  const values = [name, icon, color, category_id, user_id];
  const query = `
       UPDATE categories
       SET name = $1, icon = $2, color = $3
       WHERE id = $4 AND user_id = $5
       RETURNING *;`;
  return pool.query(query, values);
};

// Delete a selected category from this user
export const deleteCategory = (category_id, user_id) => {
  const query = `
       DELETE FROM categories 
       WHERE id = $1 AND user_id = $2;`;
  return pool.query(query, [category_id, user_id]);
};
