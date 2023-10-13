/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middlewares/index.js';

import {
    getShiftsByDate,
    getShiftById,
    addShift,
    modifyShift,
    deleteShift,
    getShiftByEmployeeIdAndDate
} from '../controllers/shiftController.js';


router
    .route('/')
    .get(authenticateUser, getShiftsByDate)
    .post(authenticateUser, addShift);

router
    .route('/employee')
    .get(authenticateUser, getShiftByEmployeeIdAndDate)

router 
    .route('/:id')
    .get(authenticateUser, getShiftById)
    .patch(authenticateUser, modifyShift)
    .delete(authenticateUser, deleteShift)


export default router;