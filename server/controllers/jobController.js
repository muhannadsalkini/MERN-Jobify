import "express-async-errors"; // To handle the catch errors
import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes"; // Used for status codes
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

// GET ALL JOBS
// Status Codes
export const getAllJobs = async (req, res) => {
  try {
    const { search, jobStatus, jobType, sort } = req.query;

    const queryObject = {
      createdBy: req.user.userId,
    };

    // regex looks if the value is anywhere there and returns it
    if (search) {
      // if search exits add it to queryObject. We are using mongo syntax
      queryObject.$or = [
        // options: "i" == don't care for the casing
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (jobStatus !== "all") {
      queryObject.jobStatus = jobStatus;
    }

    if (jobType !== "all") {
      queryObject.jobType = jobType;
    }

    // sort
    const sortOptions = {
      newest: "-createdAt",
      oldest: "createdAt",
      "a-z": "position",
      "z-a": "-position",
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res
      .status(StatusCodes.OK)
      .json({ totalJobs, numOfPages, currentPage: page, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  // Use try catch to handle errors
  try {
    const job = await Job.create(req.body);
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

export const showStats = async (req, res) => {
  // Retrieve job status statistics for the user
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  // Transform the statistics into a more convenient format
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  // Define default statistics in case some statuses are not present
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // Retrieve monthly job application statistics for the user
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  // Transform and format monthly statistics for response
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      // Format date using the dayjs library
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
