/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  validateId,
  validateVendorParams,
  validateAddressParams,
} from '../middlewares/index.js';

import {
  createVendor,
  getVendors,
  getSingleVendor,
  getAddressVendor,
  modifyVendor,
  deleteVenderAddress,
  modifyAddressVendor
} from '../controllers/vendorController.js';

router
  .route("/")
  .post(
    authenticateUser,
    validateVendorParams,
    createVendor
  )
  .get(authenticateUser, getVendors);

// this route is only used for a particular purposes
router
  .route("/address/:id")
  .get(authenticateUser, validateId, getAddressVendor)
  .delete(authenticateUser, validateId, deleteVenderAddress);

router
  .route("/:id")
  .get(authenticateUser, validateId, getSingleVendor)
  .put(authenticateUser, validateId, validateVendorParams, modifyVendor);

export default router;
