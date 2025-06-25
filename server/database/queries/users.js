import pool from "../config/connection.js";

// Get all users
export const getUsers = () => {
  return pool.query("SELECT * FROM users;");
};

// Get a selected user by his Email
export const getUser = (userEmail) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  return pool.query(query, [userEmail]);
};

// Get a selected user by his Id
export const getUserById = (user_id) => {
  const query = "SELECT * FROM users WHERE id = $1;";
  return pool.query(query, [user_id]).then(({ rows }) => rows[0]);
};

// Get a selected user by his google_Id
export const getUserByGoogleId = (google_id) => {
  const query = "SELECT * FROM users WHERE google_id = $1;";
  return pool.query(query, [google_id]);
};

// Create A Google user
export const createGoogleUser = ({ username, email, google_id }) => {
  const query = `
    INSERT INTO users (username, email, google_id)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [username, email, google_id];
  return pool.query(query, values);
};

// Create a user
export const createUser = ({ username, email, password_hash }) => {
  const query = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [username, email, password_hash];
  return pool.query(query, values);
};

// Delete a selected user by his ID
export const deleteUser = (user_id) => {
  const query = `DELETE FROM users WHERE id = $1;`;
  return pool.query(query, [user_id]);
};
