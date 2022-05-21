import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

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

export default database;
