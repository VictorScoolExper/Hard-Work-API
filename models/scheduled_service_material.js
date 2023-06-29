const {db} = require("../db/connect");

class ScheduleServiceMaterial {
    constructor(serviceMaterial){
        this.scheduled_service_material_id = serviceMaterial.scheduled_service_material_id;
        this.service_schedule_id = serviceMaterial.service_schedule_id;
        this.material_id = serviceMaterial.material_id;
        this.qty = serviceMaterial.qty;
        this.sub_total = serviceMaterial.sub_total;
    }

    static getServiceMaterials(serviceMaterial){
        return new Promise((resolve, reject) => {
          db.query("CALL sp_select_scheduled_service_materials(?)", [
            serviceMaterial.service_schedule_id
          ], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
          });
        });
    };

    static getSingleServiceMaterial(serviceMaterial){
        return new Promise((resolve, reject) => {
          db.query("CALL sp_select_single_scheduled_service_material(?)", [
            serviceMaterial.scheduled_service_material_id
          ], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
          });
        });
    };

    static updateServiceMaterial (serviceMaterial) {
        return new Promise((resolve, reject) =>{
            db.query("CALL sp_update_service_material_scheduled(?,?,?,?)", [
                serviceMaterial.scheduled_service_material_id,
                serviceMaterial.material_id,
                serviceMaterial.qty,
                serviceMaterial.sub_total
            ], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }

}

module.exports = ScheduleServiceMaterial
