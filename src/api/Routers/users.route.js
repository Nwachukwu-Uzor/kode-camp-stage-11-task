import {
  createUserAction,
  getAllUsers,
  getUserById,
  loginUser,
  logout,
  updateUserPassword,
  updateUserDetails,
  deleteUser,
} from "../Controllers/users.controller.js";

import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", createUserAction);
userRouter.post("/signin", loginUser);
userRouter.get("/logout", logout);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.patch("/users/:id/password-update", updateUserPassword);
userRouter.patch("/users/:id/update-user-details", updateUserDetails);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
