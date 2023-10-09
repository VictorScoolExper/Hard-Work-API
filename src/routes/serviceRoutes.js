/* Green Work ERP by Victor Martinez */

const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateServiceParams,
  validateId,
} = require("../middlewares");

const {
  createService,
  getServices,
  updateService,
} = require("../controllers/serviceController");

router
  .route("/")
  .get(authenticateUser, getServices)
  .post(authenticateUser, validateServiceParams, createService);

router.route("/:id").put(authenticateUser, validateId, updateService);

module.exports = router;
