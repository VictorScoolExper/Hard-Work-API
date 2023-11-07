/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();

import { login, logout, register, checkPermission } from '../controllers/auth/authController.js';
import { authenticateUser, validateRegisterParams} from '../middlewares/index.js';

router.post('/login', login);

//the following should be eliminated
router.get('/checkPermission', authenticateUser, checkPermission);

router.post('/register', validateRegisterParams, register);
router.get('/logout', logout);



// TODO: add create user functionality that can only be used by admins and Managers

export default router;