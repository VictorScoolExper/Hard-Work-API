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
  updateClient
} = require("../controllers/clientController");

router
  .route("/")
  // TODO: validate that this post req works
  .post(authenticateUser, validateClientParams, validateAddressParams, createClient)
  .get(authenticateUser, getAllClients);

router
  .route("/:id")
  // .get(authenticateUser, getSingleClientById)
  .put(authenticateUser, updateClient)
  .delete(authenticateUser, deleteAddress);

// get list of address/addresses by client id
router
  .route("/address/:id")
  .get(authenticateUser, validateId, getClientAddressById);

module.exports = router;
