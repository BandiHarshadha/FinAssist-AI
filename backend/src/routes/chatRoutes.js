import express from "express";
import {
  chat,
  getHistory,
  clearHistory,
} from "../controllers/chatController.js";

import { optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", optionalProtect, chat);
router.get("/history", optionalProtect, getHistory);
router.delete("/history", optionalProtect, clearHistory);

export default router;