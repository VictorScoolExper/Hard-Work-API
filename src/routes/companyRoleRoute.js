/* Green Work ERP by Victor Martinez */

import express from "express";
const router = express.Router();
import {
  authenticateUser
} from "../middlewares/index.js";

import {
  createCompanyRole,
  getAllCompanyRoles,
  updateCompanyRole,
  deleteCompanyRole,
} from "../controllers/company_role/companyRoleController.js";

// TODO: middleware
router
    .route("/")
    .post(authenticateUser, createCompanyRole)
    .get(authenticateUser, getAllCompanyRoles);

router
    .route("/:id")
    .put(authenticateUser, updateCompanyRole)
    .delete(authenticateUser, deleteCompanyRole);

export default router;