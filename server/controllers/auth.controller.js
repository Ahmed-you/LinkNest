import * as authService from "../services/auth.service.js";

import Joi from "joi";
// register a new user
export const registerUser = (req, res) => {
  const signupSchema = Joi.object({
    username: Joi.string()
      .pattern(/^[\p{L}\p{N}_ ]{3,30}$/u)
      .required()
      .messages({
        "string.empty": "Username is required.",
        "string.pattern.base":
          "Username must be 3–30 characters and only contain letters or numbers.",
      }),

    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),

    password: Joi.string()
      .min(8)
      .max(64)
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).+$"))
      .required()
      .messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 8 characters.",
        "string.max": "Password must be no longer than 64 characters.",
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and symbol.",
      }),
  });
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, email, password } = value;
  authService
    .registerUser({ username, email, password })
    .then(({ token, user }) => {
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ message: "Signup successful!", user });
    })
    .catch((err) => {
      console.error("Register error:", err);
      const msg =
        err.message === "Email is already registered."
          ? err.message
          : "Server error during registration.";
      res.status(500).json({ error: msg });
    });
};

// login a user

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  authService
    .loginUser({ email, password })
    .then(({ token, user }) => {
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ message: "Login successful!", user });
    })
    .catch((err) => {
      console.error("login error:", err);
      const msg = err.message;
      res.status(500).json({ error: msg });
    });
};

// login a user via google


// Log Out User
export const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logged out successfully." });
};
