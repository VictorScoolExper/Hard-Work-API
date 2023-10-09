/* Green Work ERP by Victor Martinez */

const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const Attendance = require("../models/attend");


// Get attendance by date
const getAttendByDate =  async (req, res) =>{
    // get incoming params
    const {start_date, end_date} = req.body;
    // validate params
    if(!start_date || !end_date){
        throw new CustomError.BadRequestError('Invalid Data')
    }
    //send to db
    const listOfAttend = await Attendance.getAllAttendByDate(start_date, end_date);
    res.status(StatusCodes.OK).json({list_attendee: listOfAttend, length: listOfAttend.length});
}

const getAttendById =  async (req, res) =>{
    // get id from params
    const {id: attendance_id} = req.params;
    if(!attendance_id){
        throw new CustomError.BadRequestError('Invalid Data');
    }
    //send data to db
    const attend_user = await Attendance.getAttendById(attendance_id);

    res.status(StatusCodes.OK).json({id: attend_user});
}

const getAttendByEmployee =  async (req, res) =>{
    const {id: employee_id} = req.params;
    const {start_date, end_date} = req.body;

    if(!start_date || !end_date || !employee_id){
        throw new CustomError.BadRequestError('Invalid Data')
    }

    const listEmployeeAttend = await Attendance.getAttendsOfEmployeeByRangeDate(start_date, end_date,employee_id);
    res.status(StatusCodes.OK).json({msg: listEmployeeAttend});
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
    await Attendance.addAttendance(employee_id, status);
    // if successfull return OK
    res.status(StatusCodes.CREATED).json({msg: "Attendance was registered!"});
}

// Modify attendance
const modifyAttendance = async (req, res) =>{
    // get params 
    const {id: attend_id} = req.params;
    const {status} = req.body;
    // validate params
    if(!attend_id || !status){
        throw new CustomError.BadRequestError('Invalid Data')
    }
    // send to db
    await Attendance.modifyAttendance(attend_id, status);
    res.status(StatusCodes.OK).json({msg: "Modified Correctly"});
}

const deleteAttendance = async (req, res) =>{
    // get params 
    const {id: attend_id} = req.params;

    // validate params
    if(!attend_id){
        throw new CustomError.BadRequestError('Invalid Data')
    }
    // send to db
    await Attendance.deleteAttendance(attend_id);
    res.status(StatusCodes.OK).json({msg: "Deleted Correctly"});
}


module.exports = {
    addAttendance,
    modifyAttendance,
    getAttendById,
    getAttendByDate,
    getAttendByEmployee,
    deleteAttendance
}