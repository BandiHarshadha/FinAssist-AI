import express from "express";
import { voiceMessage } from "../controllers/voiceController.js";

const router = express.Router();

router.post("/message", voiceMessage);

export default router;
