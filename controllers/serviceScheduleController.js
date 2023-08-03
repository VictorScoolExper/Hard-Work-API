const {StatusCodes} = require("http-status-codes");
const ServiceSchedule = require("../models/service_schedule");
const CustomError = require('../errors');

const createServiceSchedule = async (req, res) => {
    const serviceScheduled = req.body;

    await ServiceSchedule.createServiceSchedule(serviceScheduled);

    res.status(StatusCodes.CREATED).json({msg: "created successfully", status: 1});
}

const createServiceScheduleRoutine = async (req, res) => {
    const serviceScheduled = req.body;

    if(serviceScheduled.type != 'routine'){
        throw CustomError.BadRequestError('Error has ocurred');
    }

    // transform data

    // TODO: create mysql insert statement

    res.status(StatusCodes.CREATED).json({msg: 'created successfully', status: 1});
}

module.exports = {
    createServiceSchedule
}