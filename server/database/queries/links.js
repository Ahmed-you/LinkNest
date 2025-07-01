import pool from "../config/connection.js";

// Create link
export const createLink = ({ user_id, category_id, title, url, tags = [] }) => {
  const values = [user_id, category_id, title, url, tags];
  const query = `
    INSERT INTO links (user_id, category_id, title, url,tags)
    VALUES ($1, $2, $3, $4, $5)
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
  return pool.query(query, [category_id, user_id]).then(({ rows }) => rows);
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
export const updateLink = ({ link_id, user_id, title, url, tags = [] }) => {
  const values = [title, url, tags, link_id, user_id];
  const query = `
    UPDATE links
    SET title = $1, url = $2, tags=$3
    WHERE id = $4 AND user_id = $5
    RETURNING *;
  `;
  return pool.query(query, values);
};

// Delete link
export const deleteLink = ({ link_id, user_id }) => {
  const query = `
    DELETE FROM links
    WHERE id = $1 AND user_id = $2;
  `;
  return pool.query(query, [link_id, user_id]);
};
