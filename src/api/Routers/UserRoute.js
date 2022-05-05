const {
  createUserAction,
  getAllUsers,
  getUserById,
  updateUserPassword,
  updateUserDetails,
} = require("../Controllers/UserController.js");

const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", createUserAction);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.patch("/users/:id/password-update", updateUserPassword);
userRouter.patch("/users/:id/update-user-details", updateUserDetails);

module.exports = userRouter;
