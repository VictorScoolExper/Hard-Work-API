/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();

import {
  validateServiceScheduleParams,
  authenticateUser
} from '../middlewares/index.js';

import {
  createServiceSchedule
} from '../controllers/serviceScheduleController.js';

router
  .route("/")
  .post(
    authenticateUser, 
    validateServiceScheduleParams, 
    createServiceSchedule
  )
  
export default router;
