/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {authenticateUser, validateId, validateSingleAddress } from '../middlewares/index.js';

import {
    getSingleAddress,
    updateSingleAddress
} from '../controllers/addressController.js';

router
    .route('/:id')
    .get(authenticateUser, validateId, getSingleAddress)
    .put(authenticateUser, validateId, validateSingleAddress, updateSingleAddress)

export default router;