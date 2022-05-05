const express = require("express");
const dotenv = require("dotenv");

const ProductRouter = require("./src/api/Routers/ProductRouter.js");
const database = require("./src/config/database.js");
const userRouter = require("./src/api/Routers/UserRoute.js");

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
