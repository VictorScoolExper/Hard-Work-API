/* Green Work ERP by Victor Martinez */

const {db} = require('../db/connect');

class EmployeesAtServiceScheduled {
    constructor(employeeAtServiceScheduled){
        this.emp_at_service_id = employeeAtServiceScheduled.emp_at_service_id;
        this.service_schedule_id = employeeAtServiceScheduled.service_schedule_id;
        this.employee_id = employeeAtServiceScheduled.employee_id
    }

    static getAllEmployeesAtService(employeeAtServiceScheduled){
        return new Promise((resolve, reject) => {
          db.query("CALL sp_select_employees_at_service_scheduled(?)", [
            employeeAtServiceScheduled.service_schedule_id
          ], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
          });
        });
    };

    static updateEmployeesAtServiceScheduled (employeeAtServiceScheduled) {
        return new Promise((resolve, reject) => {
            db.query('CALL sp_update_employees_at_service_scheduled(?,?)', [
                employeeAtServiceScheduled.emp_at_service_id,
                employeeAtServiceScheduled.employee_id
            ], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}

module.exports = EmployeesAtServiceScheduled;

