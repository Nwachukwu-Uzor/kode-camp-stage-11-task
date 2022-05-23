import jwt from "jsonwebtoken";

import TokenModel from "../Models/refreshToken.model.js";

export const verifyToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Please supply a valid refresh token",
      });
    }

    const token = await TokenModel.findOne({ token: refreshToken });

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const verified = jwt.verify(
      token.token,
      process.env.USER_REFRESH_TOKEN_SECRET
    );

    await token.remove();

    const jwtToken = jwt.sign(
      { Id: verified.Id, role: verified.role },
      process.env.USER_JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshTokenGenerated = jwt.sign(
      { Id: verified.Id, role: verified.role },
      process.env.USER_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await TokenModel.create({
      userId: verified.Id,
      token: refreshTokenGenerated,
    });

    const tokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .cookie("refresh_token", refreshTokenGenerated, tokenOptions)
      .status(200)
      .json({
        success: true,
        message: "token refresh success",
        data: {
          token: `Bearer ${jwtToken}`,
          refreshToken: refreshTokenGenerated,
        },
      });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: `Unauthorized ${error.message}`,
    });
  }
};
