const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee,
  middlewareUploadImage,
} = require("../middleware");

const {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

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

module.exports = router;
