import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import voiceRoutes from "./routes/voiceRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import "./config/passport.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/voice", voiceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "FinAssist AI Backend is Running 🚀" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});