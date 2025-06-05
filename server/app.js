import express from "express";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 5000);
app.use("/", router);

export default app;
