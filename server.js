import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests. Please try again later.",
});

dotenv.config();
const app = express();
connectDB();

app.use(limiter);
app.use(express.json());
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
