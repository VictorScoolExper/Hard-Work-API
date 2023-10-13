/* Green Work ERP by Victor Martinez */

import { connection } from '../utils/index.js';

class Service {
    constructor(service){
        this.service_id = service.service_id;
        this.service_name = service.service_name;
        this.description = service.description;
        this.is_per_hour = service.is_per_hour;
        this.price = service.price;
    }

    static createService(service){
        return new Promise((resolve, reject) =>{
            connection.query('CALL sp_create_service(?,?,?,?)', 
            [
                service.service_name.toLowerCase(),
                service.description.toLowerCase(),
                service.is_per_hour.toLowerCase(),
                parseInt(service.price)
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    static getServices(){
        return new Promise((resolve, reject) =>{
            connection.query('CALL sp_get_services()',  (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    static updateService(service){
        return new Promise((resolve, reject)=>{
            connection.query('CALL sp_update_service(?,?,?,?,?)',
            [
                service.service_id,
                service.service_name,
                service.description,
                service.is_per_hour,
                service.price
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    // TODO: delete service

    // TODO: get single service
}

export default Service;