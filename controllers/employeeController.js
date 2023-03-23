
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');


const createEmployee = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({ msg: 'Hello from create Employee' });
}

const getAllEmployee = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({ msg: 'Hello from get all Employee' });
}

const getSingleEmployee = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({ msg: 'Hello from get Single Employee' });
}

const updateEmployee = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({ msg: 'Hello from update Employee' });
}

const deleteEmployee = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({ msg: 'Hello from delete Employee' });
}

module.exports = {
    createEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
}