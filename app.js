const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const ProductRouter = require("./Routers/ProductRouter.js");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("ok");
});

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful"))
  .catch((error) => console.log(error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Reached the home route" });
});

app.use("/api/products", ProductRouter);
