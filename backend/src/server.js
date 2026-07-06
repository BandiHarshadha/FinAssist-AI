import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import financialProfileRoutes from "./routes/financialProfileRoutes.js";
import privacyChatRoutes from "./routes/privacyChatRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FinAssist AI Backend is Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/privacy-chat", privacyChatRoutes);
app.use("/api/financial-profile", financialProfileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 FinAssist AI Backend running on port ${PORT}`);
});