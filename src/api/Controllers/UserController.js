const UserModel = require("../Models/UserModel.js");
const { userCreateSchema } = require("../Validation/UserValidation.js");

const bcrypt = require("bcrypt");

// CREATE A USER
const createUserAction = async (req, res) => {
  try {
    const { error } = userCreateSchema.validate(req.body);
    const { firstName, lastName, password, email: userEmail } = req.body;

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for property ${error.details[0].path}`,
      });
    }

    const existingUser = await UserModel.findOne({ email: userEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User exist with the email ${userEmail}`,
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email: userEmail,
      password: hash,
    });

    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `Error occurred ${error.message}` });
  }
};

// GET ALL USER
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0, __v: 0 });
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ sucesss: false, message: error.message });
  }
};

// GET A SINGLE USER BY ID
const getUserById = async (req, res) => {
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

// UPDATE A USER'S PASSWORD
const updateUserPassword = async (req, res) => {
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
const updateUserDetails = async (req, res) => {
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
  } catch (error) {}
};

module.exports = {
  createUserAction,
  getAllUsers,
  getUserById,
  updateUserPassword,
  updateUserDetails,
};
