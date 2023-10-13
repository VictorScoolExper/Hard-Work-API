/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  validateCompanyParams,
  validateId,
} from '../middlewares/index.js';

import {
  createCompany,
  getCompanyById,
  getCompanies,
  updateCompany,
} from '../controllers/companyController.js';

router
  .route("/")
  .get(authenticateUser, getCompanies)
  .post(authenticateUser, validateCompanyParams, createCompany);

router
  .route("/:id")
  .get(authenticateUser, validateId, getCompanyById)
  .put(authenticateUser, validateId, validateCompanyParams, updateCompany);

export default router;
