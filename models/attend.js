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

    static getAllAttendByDate(start_date, end_date){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_get_attended_users_by_date('${start_date}', '${end_date}')`, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getAttendById(attend_id){
        return new Promise((resolve, reject)=>{
            db.query(`CALL sp_get_attendance_record_by_id(${attend_id})`, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getAttendByEmployee(employee_id, start_date, end_date){
        return new Promise((resolve, reject)=>{
            db.query(`CALL (${employee_id},'${start_date}', '${end_date}')`, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

}

module.exports = Attendance;