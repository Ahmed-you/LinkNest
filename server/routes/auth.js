import express from "express";
import * as authController from "../controllers/auth.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false, // important for JWT-based login
  }),
  (req, res) => {
    // ✅ req.user is the user object from the passport strategy
    const user = req.user;

    const payload = { id: user.id, email: user.email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.error("JWT signing error:", err);
          return res.redirect("/login?error=token");
        }

        // ✅ Set token as cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // ✅ Redirect to dashboard (or frontend route)
        res.redirect("/dashboard");
      }
    );
  }
);

export default router;
