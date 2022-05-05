const {
  createUserAction,
  getAllUsers,
  getUserById,
  updateUserPassword,
  updateUserDetails,
  deleteUser,
} = require("../Controllers/UserController.js");

const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", createUserAction);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.patch("/users/:id/password-update", updateUserPassword);
userRouter.patch("/users/:id/update-user-details", updateUserDetails);
userRouter.delete("/users/:id", deleteUser);

module.exports = userRouter;
