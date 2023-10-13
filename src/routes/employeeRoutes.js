/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee,
  middlewareUploadImage,
} from '../middlewares/index.js';

import {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';

router
  .route("/")
  .post(
    authenticateUser,
    middlewareUploadImage,
    validateCreateParamsEmployee,
    createEmployee
  )
  .get(authenticateUser, getAllEmployee);

router
  .route("/:id")
  .get(authenticateUser, getSingleEmployee)
  .put(authenticateUser, middlewareUploadImage, validateUpdateParamsEmployee, updateEmployee)
  .delete(authenticateUser, deleteEmployee);

export default router;
