/* Green Work ERP by Victor Martinez */

import {StatusCodes} from 'http-status-codes';
import ServiceSchedule from '../models/service_schedule.js';
import * as CustomError from '../errors/index.js';

const createServiceSchedule = async (req, res) => {
    const serviceScheduled = req.body;

    await ServiceSchedule.createServiceSchedule(serviceScheduled);

    res.status(StatusCodes.CREATED).json({msg: "created successfully", status: 1});
}


export {
    createServiceSchedule
}