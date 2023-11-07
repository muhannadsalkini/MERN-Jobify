import express from "express";
import morgan from "morgan"; // Logging HTTP requests in web applications
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Routers
import jobRouter from "./Routers/jobRouter.js";
import userRouter from "./Routers/authRouter.js";

// Middleware
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { validateTest } from "./middleware/validationMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

dotenv.config();

//
const app = express();
const port = process.env.PORT || 5100;

//
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", userRouter);

app.post("/api/v1/test", validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ message: `hello ${name}` });
});

// Not Found Middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error Middleware
/* Error Middleware get trigged by the existing requests. It's used to handle any errors that occur during the processing of a request. mistype error or s*/
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
