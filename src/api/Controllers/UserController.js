import UserModel from "../Models/UserModel.js";
import { userCreateSchema } from "../Validation/UserValidation.js";

import bcrypt from "bcrypt";

// CREATE A USER
export const createUserAction = async (req, res) => {
  const { firstName, lastName, password: newUserPassword, email } = req.body;
  try {
    const { error } = userCreateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for property ${error.details[0].message}`,
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User exist with the email ${email}`,
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(newUserPassword, salt);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const { password, _v, ...others } = newUser._doc;
    return res.status(201).json({ success: true, data: others });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `Error occurred ${error.message}` });
  }
};

// GET ALL USER
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0, __v: 0 });
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ sucesss: false, message: error.message });
  }
};

// GET A SINGLE USER BY ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided credentials",
      });
    }

    const { password, ...userToReturn } = user._doc;

    return res.status(200).json({ success: true, data: userToReturn });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `Error occured ${error.message}` });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (user == null) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `Error occured ${error.message}` });
  }
};

// UPDATE A USER'S PASSWORD
export const updateUserPassword = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided credentials",
      });
    }

    const { password: newPassword } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(newPassword, salt);
    await UserModel.findByIdAndUpdate(id, { password: hash });
    return res
      .status(204)
      .json({ success: true, message: "Password update success" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `Error occurred ${error.message}` });
  }
};

// UPDATE USER DETAILS EXCEPT PASSWORD AND EMAIL
export const updateUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided credentials",
      });
    }

    const dataForUpdate = {
      ...req.body,
      password: user.password,
      email: user.email,
    };

    const updatedUser = await UserModel.findByIdAndUpdate(id, dataForUpdate, {
      new: true,
    });

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `An error occured ${error.message}` });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided credentials",
      });
    }

    await UserModel.findByIdAndDelete(id);
    return res.status(204).json();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `An error occured ${error.message}` });
  }
};
