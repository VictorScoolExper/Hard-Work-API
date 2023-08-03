const { db } = require("../db/connect");

class ServiceSchedule {
  constructor(serviceSchedule) {
    this.service_schedule_id = serviceSchedule.service_schedule_id;
    this.client_id = serviceSchedule.client_id;
    this.address_id = serviceSchedule.address_id;
    this.start_time = serviceSchedule.start_time;
    this.end_time = serviceSchedule.end_time;
    this.date_scheduled = serviceSchedule.date_scheduled;
    this.type = serviceSchedule.type;
    this.status = serviceSchedule.status;
  };

  static createServiceSchedule(serviceSchedule) {
    // We transform data if null
    const materials = serviceSchedule.materials === null ? [] : serviceSchedule.materials;
    const employees = serviceSchedule.employees === null ? [] : serviceSchedule.employees;

    return new Promise((resolve, reject) => {
      db.query(
        "CALL sp_create_service_schedule(?,?,?,?,?,?,?,?)",
        [
          serviceSchedule.client_id,
          serviceSchedule.address_id,
          serviceSchedule.start_time,
          serviceSchedule.end_time,
          serviceSchedule.date_scheduled,
          JSON.stringify(serviceSchedule.services),
          JSON.stringify(materials),
          JSON.stringify(employees)
        ],
        (error, result) => {
          return error ? reject(error) : resolve(result[0]);
        }
      );
    });
  };

  static getServiceScheduled() {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_select_all_service_schedule()", (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      });
    });
  };

  static getSingleServiceScheduled(serviceSchedule){
    return new Promise((resolve, reject) => {
      db.query("CALL sp_select_service_schedule(?)", [
        serviceSchedule.service_schedule_id
      ], (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      });
    });
  }

  static updateClientServiceScheduled(serviceSchedule){
    return new Promise((resolve, reject) => {
        db.query("CALL sp_update_client_id_service_schedule(?,?)", [
            serviceSchedule.service_schedule_id,
            serviceSchedule.client_id
        ], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
  };

  static updateAddressServiceScheduled (serviceSchedule){
    return new Promise((resolve, reject) => {
        db.query("CALL sp_update_address_id_service_schedule(?,?)", [
            serviceSchedule.service_schedule_id,
            serviceSchedule.address_id
        ], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
  };


  static updateToDoTimeServiceScheduled (serviceSchedule) {
    return new Promise((resolve, reject) => {
        db.query("CALL sp_update_todo_and_time_service_schedule(?,?,?,?)", [
            serviceSchedule.service_schedule_id,
            serviceSchedule.start_time,
            serviceSchedule.end_time,
            serviceSchedule.date_scheduled
        ], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
  }

  static updateTypeServiceScheduled (serviceSchedule) {
    return new Promise((resolve, reject) => {
        db.query("CALL sp_update_type_service_schedule(?,?)", [
            serviceSchedule.service_schedule_id,
            serviceSchedule.type
        ], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
  }

  static updateStatusServiceScheduled (serviceSchedule) {
    return new Promise((resolve, reject) => {
        db.query("CALL sp_update_status_service_schedule(?,?)", [
            serviceSchedule.service_schedule_id,
            serviceSchedule.status
        ], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
  }
}

module.exports = ServiceSchedule;
