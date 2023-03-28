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

    static addAttendance(shifts_json){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_add_shifts('${shifts_json}')`, (error, result)=>{
                error ? reject(error) : resolve(result);
            });
        })
    }

}

module.exports = Attendance;