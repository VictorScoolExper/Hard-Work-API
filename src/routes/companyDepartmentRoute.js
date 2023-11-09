/* Green Work ERP by Victor Martinez */

import express from "express";
const router = express.Router();
import { authenticateUser } from "../middlewares/index.js";

import {
  createCompanyDepartment,
  getAllCompanyDepartment,
  updateCompanyDepartment,
  deleteCompanyDepartment,
} from "../controllers/company_department/companyDepartmentController.js";

// TODO: Middleware
// put vs patch

router
  .route("/")
  .post(authenticateUser, createCompanyDepartment)
  .get(authenticateUser, getAllCompanyDepartment);

router
  .route("/")
  .put(authenticateUser, updateCompanyDepartment)
  .delete(authenticateUser, deleteCompanyDepartment);

export default router;