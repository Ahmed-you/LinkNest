import express from "express";
import router from "./routes/index.js";
import { applySecurity } from "./middleware/security.js";
import passport from "passport";
import "./config/passport.js";

const app = express();
applySecurity(app);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 5000);
app.use("/", router);

export default app;
