import { nanoid } from "nanoid"; // creat uniqe id
import Job from "../models/jobModel.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  // Use try catch to handle errors
  try {
    const job = await Job.create({ company, position });
    res.status(201).json({ job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// GET A SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ msg: `no job with id ${id}` });
    res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  try {
    const updatedjob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedjob) {
      return res.status(400).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ msg: "modified job", updatedjob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const removedJob = await Job.findByIdAndDelete(id);

    if (!removedJob) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job: removedJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
