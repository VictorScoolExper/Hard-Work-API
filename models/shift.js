const {db} = require("../db/connect");
const Employee = require('./employee');

class Shift extends Employee {
    constructor(shift){
        super(shift);
        this.shift_id = shift.shift_id;
        this.employee_id = shift.employee_id;
        this.start_date = shift.start_date;
        this.end_time = shift.end_date;      
    }

    static addShift(shifts_json){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_add_shifts('${shifts_json}')`, (error, result)=>{
                error ? reject(error) : resolve(result);
            });
        })
    }

    static getAllShiftsbyDates(start_date, end_date){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_get_shifts_by_date_range('${start_date}', '${end_date}')`, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getShiftsEmployeeByDate(employee_id, start_date, end_date){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_get_shifts_employee_by_date_range('${employee_id}','${start_date}', '${end_date}')`, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getShiftById(shiftId){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_get_shift_by_id(${shiftId})`, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static modifyShift(shiftId, start_time, end_time){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_update_shift(${shiftId}, '${start_time}', '${end_time}')`, (error, result)=>{
                error ? reject(error) : resolve(result);
            });
        })
    }

    static deleteShift(shiftId){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_delete_shift_by_id(${shiftId})`, (error, result)=>{
                error ? reject(error) : resolve(result);
            });
        })
    }
}

module.exports = Shift;