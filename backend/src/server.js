import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import voiceRoutes from "./routes/voiceRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import financialProfileRoutes from "./routes/financialProfileRoutes.js";

import "./config/passport.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// =============================
// API Routes
// =============================
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/financial-profile", financialProfileRoutes);

// =============================
// Health Check
// =============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 FinAssist AI Backend Running",
    version: "2.0",
  });
});

// =============================
// 404 Handler
// =============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// =============================
// Global Error Handler
// =============================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 FinAssist AI Backend running on port ${PORT}`);
});