import express from "express";
import {
  privacyChat,
  continuePrivacyChat,
  getPrivacyChatHistory,
  clearPrivacyChatHistory,
} from "../controllers/privacyChatController.js";

import { optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", optionalProtect, privacyChat);
router.post("/continue", optionalProtect, continuePrivacyChat);
router.get("/history", optionalProtect, getPrivacyChatHistory);
router.delete("/history", optionalProtect, clearPrivacyChatHistory);

export default router;