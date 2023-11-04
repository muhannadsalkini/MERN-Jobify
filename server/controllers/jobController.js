import "express-async-errors"; // To handle the catch errors
import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes"; // Used for status codes
import { NotFoundError } from "../errors/customErrors.js";

// GET ALL JOBS
// Status Codes
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs });
    // res.status(200).json({ jobs });
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
    res.status(StatusCodes.CREATED).json({ job });
    // res.status(201).json({ job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// GET A SINGLE JOB
// Status Codes, Express Async Errors, Custom Errors, Validation
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(200).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // if (!updatedJob)
    //   return res.status(404).json({ msg: `no job with id ${id}` });

    res.status(200).json({ msg: "modified job", updatedJob });
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

    // if (!removedJob)
    //   return res.status(404).json({ msg: `no job with id ${id}` });

    res.status(200).json({ job: removedJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
