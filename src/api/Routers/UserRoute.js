import {
  createUserAction,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserPassword,
  updateUserDetails,
  deleteUser,
} from "../Controllers/UserController.js";

import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", createUserAction);
userRouter.post("/signin", loginUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.patch("/users/:id/password-update", updateUserPassword);
userRouter.patch("/users/:id/update-user-details", updateUserDetails);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
