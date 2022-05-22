import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }

    const verified = jwt.verify(token, process.env.USER_JWT_SECRET);

    console.log(verified);

    req.user = verified;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
};
