import express from "express";
import morgan from "morgan"; // Logging HTTP requests in web applications
import jobRouter from "./Routers/jobRouter.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/jobs", jobRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ mesaage: "data receved", data: req.body });
});

// Not Found Middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error Middleware
/* Error Middleware get triggerd by the existing reqests. It's used to handle any errors that occur during the processing of a request. misstype error or s*/
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
