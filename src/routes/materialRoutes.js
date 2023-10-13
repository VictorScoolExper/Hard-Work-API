/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  validateMaterialParams,
  validateId,
} from '../middlewares/index.js';

import {
  createMaterial,
  getMaterials,
  updateMaterial,
} from '../controllers/materialController.js';

router
    .route("/")
    .get(authenticateUser, getMaterials)
    .post(authenticateUser, validateMaterialParams, createMaterial);

router.route("/:id").put(authenticateUser, validateMaterialParams, updateMaterial);

export default router;