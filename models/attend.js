const {db} = require("../db/connect");
const Employee = require('./employee');

class Attendance extends Employee {
    constructor(attend){
        super(attend);
        this.attendance_id = attend.attendance_id;
        this.employee_id = attend.employee_id;
        this.attendance_date = attend.attendance_date;
        this.status = attend.status;
    }

    static addAttendance(employee_id, status){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_insert_attendance(${employee_id}, '${status}')`, (error, result)=>{
                error ? reject(error) : resolve(result);
            });
        })
    }




}

module.exports = Attendance;