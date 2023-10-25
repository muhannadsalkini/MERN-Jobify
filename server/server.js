import express from "express";
import morgan from "morgan"; // Logging HTTP requests in web applications
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ mesaage: "data receved", data: req.body });
});

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
