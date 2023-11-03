import { body, validationResult } from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

// Validation Process (Function)
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessage });
      }
      next();
    },
  ];
};

// Validation Properties
export const validateTest = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("name must be between 3 and 50 characters long")
    .trim(),
]);

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);
