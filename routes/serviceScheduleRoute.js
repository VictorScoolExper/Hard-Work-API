const express = require("express");
const router = express.Router();

const {
  validateServiceScheduleParams,
  authenticateUser,
} = require("../middleware");

const {
  createServiceSchedule,
} = require("../controllers/serviceScheduleController");

router
  .route("/")
  .post(
    authenticateUser, 
    validateServiceScheduleParams, 
    createServiceSchedule)
  .get();

//  TODO: add route for services service

// TODO: add route for service material

// TODO: add route for service employees

module.exports = router;
