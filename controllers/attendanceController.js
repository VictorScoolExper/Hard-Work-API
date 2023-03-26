const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");

// get the list of work schedules by daily

// get work schedule of employee

// get the days and hours active of employeee and returns a list

// this adds the Employee schedule
const addEmployeeWorkSchedule = async (req,res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route addEmployeeWorkSchedule"});
} 
// this adds if they attended the scheduled work hours
const addEmployeeAttendance = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route addEmployeeAttendance"});
}
// modify employee work schedule
const modifyEmployeeWorkSchedule = async (req, res) =>{
    res.status(StatusCodes.OK).json({msg: "Route modifyEmployeeWorkSchedule"});
}
// delete work schedule when inactive
const deleteEmployeeWorkSchedule = async (req, res) =>{
    res.status(StatusCodes.OK).json({msg: "Route eleteEmployeeWorkSchedule"});
}
// Modify attendance
const modifyEmployeeAttendance = async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route modifyEmployeeAttendance"});
}

module.exports = {
    addEmployeeWorkSchedule,
    addEmployeeAttendance,
    modifyEmployeeWorkSchedule,
    deleteEmployeeWorkSchedule,
    modifyEmployeeAttendance
}