const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const Shift = require("../models/shift");

// get the list of work Shifts by daily
const getShiftsByDate =  async (req, res) =>{
    // retrieve params
    const {start_date, end_date} = req.body;
    // validate params
    if(!start_date || !end_date){
        throw new CustomError.BadRequestError('Invalid Data');
    }
    // send to db
    const response = await Shift.getAllShiftsbyDates(start_date, end_date);
    res.status(StatusCodes.CREATED).json({list_shifts: response, shift_list: response.length});
}

const getShiftByEmployeeIdAndDate = async (req, res) =>{
    // retrieve params
    const {employee_id, start_date, end_date} = req.body;
    // validate params
    if(!start_date || !end_date){
        throw new CustomError.BadRequestError('Invalid Data');
    }
    // send to db
    const response = await Shift.getShiftsEmployeeByDate(employee_id, start_date, end_date);
    res.status(StatusCodes.CREATED).json({list_shifts: response, shift_list: response.length});
}

// get shift by id
const getShiftById =  async (req, res) =>{
    // retrieve params
    const {id: shiftId} = req.params;
    
    //send to db
    const response = await Shift.getShiftById(shiftId);

    res.status(StatusCodes.CREATED).json({listShifts: response, shiftLength: response.length});
}

// this adds the Employee Shift
const addShift = async (req,res) =>{
    // get params
    const {shifts} = req.body;
    // verify params
    if(shifts[0] === null){
        throw new CustomError.BadRequestError('Invalid params');
    }

    // transform data
    const shifts_json = JSON.stringify(shifts);
    // send sp call
    await Shift.addShift(shifts_json)
    // if successfull return OK
    res.status(StatusCodes.CREATED).json({msg: "Inserted Correctly"});
} 

// modify employee work Shift
const modifyShift = async (req, res) =>{
    // get params
    const {id: shiftId} = req.params;
    const {start_time, end_time} = req.body
    // validate params
    if(!start_time || !end_time){
        throw new CustomError.BadRequestError('Not valid data');
    }
    // send 
    await Shift.modifyShift(shiftId, start_time, end_time);
    res.status(StatusCodes.OK).json({msg : 'Updated correctly'});
}

// delete work Shift when inactive
const deleteShift = async (req, res) =>{
    // get params
    const {id: shift_id} = req.params;

    //send to db
    await Shift.deleteShift(shift_id);
    res.status(StatusCodes.OK).json({msg: "deleted correctly"});
}


module.exports = {
    getShiftsByDate,
    getShiftById,
    addShift,
    modifyShift,
    deleteShift,
    getShiftByEmployeeIdAndDate
}