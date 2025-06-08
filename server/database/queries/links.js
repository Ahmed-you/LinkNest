import pool from "../config/connection.js";

// Create link
export const createLink = ({ user_id, category_id, title, url }) => {
  const values = [user_id, category_id, title, url];
  const query = `
    INSERT INTO links (user_id, category_id, title, url)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return pool.query(query, values);
};

// Get all links for a category (for this user)
export const getLinksByCategory = (category_id, user_id) => {
  const query = `
    SELECT * FROM links
    WHERE category_id = $1 AND user_id = $2
    ORDER BY created_at DESC;
  `;
  return pool.query(query, [category_id, user_id]);
};

// Get a single link by id (for edit screen for example)
export const getLinkById = (link_id, user_id) => {
  const query = `
    SELECT * FROM links
    WHERE id = $1 AND user_id = $2;
  `;
  return pool.query(query, [link_id, user_id]);
};

// Edit link
export const editLink = ({ link_id, user_id, title, url }) => {
  const values = [title, url, link_id, user_id];
  const query = `
    UPDATE links
    SET title = $1, url = $2, 
    WHERE id = $3 AND user_id = $4
    RETURNING *;
  `;
  return pool.query(query, values);
};

// Delete link
export const deleteLink = (link_id, user_id) => {
  const query = `
    DELETE FROM links
    WHERE id = $1 AND user_id = $2;
  `;
  return pool.query(query, [link_id, user_id]);
};
