import express from "express";
import {
  chat,
  getHistory,
  clearHistory,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chat);
router.get("/history", getHistory);
router.delete("/history", clearHistory);

export default router;