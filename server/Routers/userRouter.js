import { Router } from "express";
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplicationStats);
router.put("/update-user", updateUser);

export default router;
