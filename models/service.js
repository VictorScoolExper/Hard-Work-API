const { db } = require("../db/connect");

class Service {
    constructor(service){
        this.service_id = service.service_id;
        this.service_name = service.service_name;
        this.description = service.description;
        this.is_per_hour = service.is_per_hour;
        this.price = service.price;
        this.duration_minutes = service.duration_minutes
    }

    static createService(service){
        return new Promise((resolve, reject) =>{
            db.query('CALL sp_create_service(?,?,?,?)', 
            [
                service.service_name,
                service.description,
                service.is_per_hour,
                service.price,
                service.duration_minutes
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    static getServices(){
        return new Promise((resolve, reject) =>{
            db.query('CALL sp_get_service()',  (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    static updateService(service){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_update_service()',
            [
                service.service_id,
                service.service_name,
                service.description,
                service.is_per_hour,
                service.price,
                service.duration_minutes
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    // TODO: delete service

    // TODO: get single service
}

module.exports = Service;