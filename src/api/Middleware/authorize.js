import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }

    jwt.verify(token, process.env.USER_JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: "You are not authorized to access this route",
        });
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
};
