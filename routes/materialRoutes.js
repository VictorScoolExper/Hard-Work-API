const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateMaterialParams,
  validateId,
} = require("../middleware");

const {
  createMaterial,
  getMaterials,
  updateMaterial,
} = require("../controllers/materialController");

router
    .route("/")
    .get(authenticateUser, getMaterials)
    .post(authenticateUser, validateMaterialParams, createMaterial);

router.route("/:id").put(authenticateUser, validateMaterialParams, updateMaterial);

module.exports = router;