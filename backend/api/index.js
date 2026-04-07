import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import contactRoutes from "../routes/contactRoutes.js";

dotenv.config();

const app = express();

// Connect DB safely
try {
  await connectDB();
} catch (err) {
  console.error("❌ DB connection failed:", err.message);
}

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Root
app.get("/", (req, res) => res.send("Backend running 🚀"));

export default app;