const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const Attendance = require("../models/attend");


// Get attendance by date
const getAttendByDate =  async (req, res) =>{
    // get incoming params
    
    // validate params

    //send to db

    res.status(StatusCodes.CREATED).json({msg: "Route getAttendByDate"});
}

const getAttendById =  async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route getAttendById"});
}

const getAttendByEmployee =  async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route getAttendByEmployee"});
}

// this adds if they attended the Shiftd work hours
const addAttendance = async (req, res) =>{
    // get params
    const {employee_id, status} = req.body;
    // verify params
    if(!employee_id || !status){
        throw new CustomError.BadRequestError('Invalid params');
    }
    // send sp call
    const response = await Attendance.addAttendance(employee_id, status);
    // if successfull return OK
    res.status(StatusCodes.CREATED).json({msg: response});
}

// Modify attendance
const modifyAttendance = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route modifyEmployeeAttendance"});
}

module.exports = {
    addAttendance,
    modifyAttendance,
    getAttendById,
    getAttendByDate,
    getAttendByEmployee,
}