const express = require("express");
const router = express.Router();

const {
  validateServiceScheduleParams,
  authenticateUser
} = require("../middleware");

const {
  createServiceSchedule
} = require("../controllers/serviceScheduleController");

router
  .route("/")
  .post(
    authenticateUser, 
    validateServiceScheduleParams, 
    createServiceSchedule
  )
  
module.exports = router;
