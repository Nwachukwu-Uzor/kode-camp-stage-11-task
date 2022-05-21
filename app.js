import express from "express";
import dotenv from "dotenv";

import ProductRouter from "./src/api/Routers/ProductRouter.js";
import database from "./src/config/database.js";
import userRouter from "./src/api/Routers/UserRoute.js";

dotenv.config();

const app = express();

database(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Reached the home route" });
});

app.use("/api/products", ProductRouter);
app.use("/api/accounts", userRouter);
