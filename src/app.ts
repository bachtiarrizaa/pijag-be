import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Pijag Coffee API running");
});

app.use("/api/auth", authRoutes);

export default app;