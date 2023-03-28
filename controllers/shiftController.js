const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");

// get the list of work Shifts by daily
const getShiftsByDate =  async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route getShiftsByDate"});
}

// get work Shift of employee
const getShiftById =  async (req, res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route getShiftById"});
}

// this adds the Employee Shift
const addShift = async (req,res) =>{
    res.status(StatusCodes.CREATED).json({msg: "Route addShift"});
} 

// modify employee work Shift
const modifyShift = async (req, res) =>{
    res.status(StatusCodes.OK).json({msg: "Route modifyShift"});
}

// delete work Shift when inactive
const deleteShift = async (req, res) =>{
    res.status(StatusCodes.OK).json({msg: "Route deleteShift"});
}


module.exports = {
    getShiftsByDate,
    getShiftById,
    addShift,
    modifyShift,
    deleteShift
}