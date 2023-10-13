/* Green Work ERP by Victor Martinez */

import { connection } from '../utils/index.js';

class RoutineScheduledService {
    constructor(routineScheduledService){
        this.routine_schedule_id = routineScheduledService.routine_schedule_id;
        this.service_schedule_id = routineScheduledService.service_schedule_id;
        this.days_until_repeat = routineScheduledService.days_until_repeat;
        this.last_service_date = routineScheduledService.last_service_date;
        this.status = routineScheduledService.status;
    }

    static getAllRoutines (routineScheduledService){
        return new Promise((resolve, reject) => {
          connection.query("CALL sp_select_routine_scheduled_services(?)", [
            routineScheduledService.service_schedule_id
          ], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
          });
        });
    };

    static updateDaysUntilRepeat (routineScheduledService) {
        return new Promise((resolve, reject) => {
            connection.query('CALL sp_update_days_repeat_routine_scheduled_services(?,?)', [
                routineScheduledService.routine_schedule_id,
                routineScheduledService.days_until_repeat
            ], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }

    static updateStatus (routineScheduledService){
        return new Promise((resolve, reject) => {
            connection.query('CALL sp_update_status_routine_scheduled_services(?,?)', [
                routineScheduledService.routine_schedule_id,
                routineScheduledService.status
            ], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
    // TODO: Test sp to make sure it functions
    static updateLastService (routineScheduledService){
        return new Promise((resolve, reject) => {
            connection.query('CALL sp_update_last_service_routine_scheduled_services(?,?)', [
                routineScheduledService.routine_schedule_id,
                routineScheduledService.last_service_date
            ], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}

export default RoutineScheduledService;