/* Green Work ERP by Victor Martinez */

const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateCompanyParams,
  validateId,
} = require("../middlewares");

const {
  createCompany,
  getCompanyById,
  getCompanies,
  updateCompany,
} = require("../controllers/companyController");

router
  .route("/")
  .get(authenticateUser, getCompanies)
  .post(authenticateUser, validateCompanyParams, createCompany);

router
  .route("/:id")
  .get(authenticateUser, validateId, getCompanyById)
  .put(authenticateUser, validateId, validateCompanyParams, updateCompany);

module.exports = router;
