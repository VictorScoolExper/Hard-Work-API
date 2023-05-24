const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateAddressParams,
  validateClientParams,
  validateId,
} = require("../middleware");

const {
  createClient,
  getAllClients,
  getClientAddressById,
  getSingleClientById,
  deleteAddress,
  modifyClient,
  modifyAddress,
} = require("../controllers/clientController");

router
  .route("/")
  .post(authenticateUser, validateClientParams, createClient)
  .get(authenticateUser, getAllClients);

router
  .route("/:id")
  .get(authenticateUser, getSingleClientById)
  .patch(authenticateUser, modifyClient)
  .delete(authenticateUser, deleteAddress);

// get list of address/addresses by client id
router
  .route("/address/:id")
  .get(authenticateUser, validateId, getClientAddressById)
  .patch(authenticateUser, modifyAddress);

module.exports = router;
