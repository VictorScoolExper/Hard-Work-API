const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateId,
  validateVendorParams,
  validateAddressParams,
} = require("../middleware");

const {
  createVendor,
  getVendors,
  getSingleVendor,
  getAddressVendor,
  modifyVendor,
  deleteVenderAddress,
  modifyAddressVendor
} = require("../controllers/vendorController");

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

module.exports = router;
