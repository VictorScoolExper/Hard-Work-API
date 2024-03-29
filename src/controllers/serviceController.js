/* Green Work ERP by Victor Martinez */

import {StatusCodes} from 'http-status-codes';
import Service from '../models/service.js';

const createService = async (req, res) => {
    const service = req.body;

    await Service.createService(service);

    res.status(StatusCodes.CREATED).json({msg: "Created service", status: "1"});
}

const getServices = async (req, res) => {
    const response = await Service.getServices();
    res.status(StatusCodes.OK).json({ services: response, length: response.length, status: 1 });
}

const updateService = async (req, res) => {
    const {id} = req.params;
    const service = req.body; 
    await Service.updateService(service);
    res.status(StatusCodes.OK).json({msg: "the service has been updated", status: 1});
}

// delete services

export {
    createService,
    getServices,
    updateService
}