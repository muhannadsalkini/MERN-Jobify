import { Router } from "express";
import {
  getAllJobs,
  createJob,
  deleteJob,
  getJob,
  updateJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
