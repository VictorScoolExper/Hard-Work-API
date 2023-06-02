const {db} = require("../db/connect");

class Material {
    constructor(material){
        this.material_id = material.material_id;
        this.material_name = material.material_name;
        this.description = material.description;
        this.unit = material.unit;
    }

    static createMaterial(material){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_create_material(?,?,?)', [
                material.material_name.toLowerCase(),
                material.description.toLowerCase(),
                material.unit.toLowerCase()
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        });
    }

    static getMaterials(){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_get_materials()', (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static updateMaterial(material){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_update_material(?,?,?,?)', 
            [
                material.material_id,
                material.material_name.toLowerCase(),
                material.description.toLowerCase(),
                material.unit.toLowerCase()
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }
}

module.exports = Material;