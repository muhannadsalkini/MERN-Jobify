import { Router } from "express";
import { validateJobInput } from "../middleware/validationMiddleware.js";

const router = Router();

import {
  getAllJobs,
  createJob,
  deleteJob,
  getJob,
  updateJob,
} from "../controllers/jobController.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
