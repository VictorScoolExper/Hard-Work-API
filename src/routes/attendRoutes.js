/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middlewares/index.js';

import {
    addAttendance,
    modifyAttendance,
    getAttendByEmployee,
    getAttendByDate,
    getAttendById,
    deleteAttendance 
} from '../controllers/attendController.js';

router
    .route('/')
    .get(authenticateUser,  getAttendByDate)
    .post(authenticateUser, addAttendance)
    
router
    .route('/:id')
    .get(authenticateUser, getAttendById)
    .patch(authenticateUser, modifyAttendance)
    .delete(authenticateUser, deleteAttendance)

router
    .route('/employee/:id')
    .get(authenticateUser, getAttendByEmployee)


export default router;