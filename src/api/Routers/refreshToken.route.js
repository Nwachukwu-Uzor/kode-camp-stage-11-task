import express from "express";

import { verifyToken } from "../Controllers/token.controller.js";

const router = express.Router();

router.post("/refreshToken", verifyToken);

export default router;
