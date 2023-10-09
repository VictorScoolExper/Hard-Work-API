/* Green Work ERP by Victor Martinez */

const {db} = require("../db/connect");

class ScheduledServiceServices {
    constructor(scheduleServiceServices){
        this.scheduled_service_task_id = scheduleServiceServices.scheduled_service_task_id;
        this.service_schedule_id = scheduleServiceServices.service_schedule_id;
        this.service_id = scheduleServiceServices.service_id;
        this.quantity = scheduleServiceServices.quantity
    }


    static getSingleScheduledServiceService(scheduleServiceServices){
        return new Promise((resolve, reject) => {
          db.query("CALL sp_select_scheduled_service_services(?)", [
            scheduleServiceServices.service_schedule_id
          ], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
          });
        });
    }

    static updateScheduleServiceServices (scheduleServiceServices) {
        return new Promise((resolve, reject) =>{
            db.query("CALL sp_update_scheduled_service_services(?,?,?)", [
                scheduleServiceServices.scheduled_service_task_id,
                scheduleServiceServices.service_id,
                scheduleServiceServices.quantity
            ], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}

module.exports = ScheduledServiceServices