const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const Attendance = require("../models/attend");



// Get attendance by date
const getAttendByDate =  async (req, res) =>{
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
    // const {shifts} = req.body;
    // // verify params
    // if(shifts[0] === null){
    //     throw new CustomError.BadRequestError('Invalid params');
    // }
    const shifts = [
        {
          employee_id: 1,
          shift_date: '2023-03-28',
          start_time: '09:00:00',
          end_time: '17:00:00'
        },
        {
          employee_id: 2,
          shift_date: '2023-03-29',
          start_time: '08:00:00',
          end_time: '16:00:00'
        }
      ];

    // transform data
    const shifts_json = JSON.stringify(shifts);
    // send sp call
    const response = await Attendance.addAttendance(shifts_json)
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