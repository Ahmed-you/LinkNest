import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersQueries from "../database/queries/users.js";

const signJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "1d" },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

export const registerUser = ({ username, email, password }) => {
  return usersQueries
    .getUser(email)
    .then((userResult) => {
      if (userResult.rows.length > 0) {
        throw new Error("Email is already registered.");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return usersQueries.createUser({
        username,
        email,
        password_hash: hashedPassword,
      });
    })
    .then((result) => {
      const user = result.rows[0];
      return signJWT({ id: user.id, email: user.email }).then((token) => {
        const safeUser = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        return { token, user: safeUser };
      });
    });
};

export const loginUser = ({ email, password }) => {
  return usersQueries.getUser(email).then((userResult) => {
    if (userResult.rows.length === 0) {
      throw new Error("User not found.");
    }

    const user = userResult.rows[0];

    if (!user.password_hash) {
      throw new Error("Invalid user data.");
    }

    return bcrypt.compare(password, user.password_hash).then((isMatch) => {
      if (!isMatch) {
        throw new Error("Incorrect password.");
      }

      return signJWT({ id: user.id, email: user.email }).then((token) => {
        const safeUser = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        return { token, user: safeUser };
      });
    });
  });
};
