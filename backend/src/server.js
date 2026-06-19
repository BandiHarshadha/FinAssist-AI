import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import privacyRoutes from "./routes/privacyRoutes.js";

import { promptInjectionGuard } from "./middleware/promptInjectionGuard.js";

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/
app.use(promptInjectionGuard);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
  res.json({
    message: "FinAssist AI Backend is Running 🚀",
    status: "success",
    version: "1.0.0"
  });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
app.use("/api/chat", chatRoutes);
app.use("/api/privacy", privacyRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});