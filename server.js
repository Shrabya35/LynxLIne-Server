import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// CORS setup
app.use(
  cors({
    origin: "https://lynxline-client.onrender.com",
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);


// Route handlers
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

// Basic routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my app</h1>");
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgBlue.white);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});
