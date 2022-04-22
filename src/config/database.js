const dotenv = require("dotenv");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const database = async (app) => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, () => {
      console.log("database is connected successfully");
      app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = database;
