/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  validateServiceParams,
  validateId,
} from '../middlewares/index.js';

import {
  createService,
  getServices,
  updateService,
} from '../controllers/serviceController.js';

router
  .route("/")
  .get(authenticateUser, getServices)
  .post(authenticateUser, validateServiceParams, createService);

router.route("/:id").put(authenticateUser, validateId, updateService);

export default router;
