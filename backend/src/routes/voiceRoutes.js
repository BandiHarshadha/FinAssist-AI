import express from "express";
import {
  voiceMessage,
  getVoiceHistory,
  clearVoiceHistory,
} from "../controllers/voiceController.js";

const router = express.Router();

router.post("/message", voiceMessage);
router.get("/history", getVoiceHistory);
router.delete("/history", clearVoiceHistory);

export default router;