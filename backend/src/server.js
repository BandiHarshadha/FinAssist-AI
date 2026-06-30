import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chatRoutes.js";
import privacyRoutes from "./routes/privacyRoutes.js";
import voiceRoutes from "./routes/voiceRoutes.js";

import { promptInjectionGuard } from "./middleware/promptInjectionGuard.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(promptInjectionGuard);

app.get("/", (req, res) => {
  res.json({
    message: "FinAssist AI Backend is Running 🚀",
    status: "success",
    version: "1.0.0",
  });
});

app.use("/api/chat", chatRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/voice", voiceRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});