/* Green Work ERP by Victor Martinez */

const express = require("express");
const router = express.Router();

const {
  validateServiceScheduleParams,
  authenticateUser
} = require("../middlewares");

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
