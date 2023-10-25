import express from "express";
import morgan from "morgan"; // Logging HTTP requests in web applications
import * as dotenv from "dotenv";
import { nanoid } from "nanoid"; // creat uniqe id
dotenv.config();

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

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

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide comapny and position" });
  }

  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET A SINGLE JOB
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(400).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// UPDATE JOB
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(400).json({ msg: `no job with id ${id}` });
  }

  if (!company || !position) {
    return res.status(400).json({ msg: "please provide comapny and position" });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: "modified job", job });
});

// DELETE JOB
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(400).json({ msg: `no job with id ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: "Job deleted", jobs });
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
