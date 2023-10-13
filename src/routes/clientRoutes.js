/* Green Work ERP by Victor Martinez */

import express from "express";
const router = express.Router();
import {
  authenticateUser,
  validateAddressParams,
  validateClientParams,
  validateId,
} from '../middlewares/index.js';

import {
  createClient,
  getAllClients,
  getClientAddressById,
  getSingleClientById,
  deleteAddress,
  updateClient
} from '../controllers/clientController.js';

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

export default router;
