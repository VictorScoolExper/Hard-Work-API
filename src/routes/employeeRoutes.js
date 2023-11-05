/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  middlewareUploadImage,
} from '../middlewares/index.js';

import {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee/employeeController.js';

router
  .route("/")
  .post(
    authenticateUser,
    middlewareUploadImage,
    createEmployee
  )
  .get(authenticateUser, getAllEmployee);

router
  .route("/:id")
  .get(authenticateUser, getSingleEmployee)
  .put(authenticateUser, middlewareUploadImage, updateEmployee)
  .delete(authenticateUser, deleteEmployee);

export default router;
