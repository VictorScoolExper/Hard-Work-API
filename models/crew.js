const { db } = require("../db/connect");
// TODO: utilize class or delete constructor
// employee is a list of employees
class Crew  {
    constructor(crew ) {
        this.crew_id = crew.crew_id;
        this.crew_leader = crew.crew_leader;
        this.employee_id = crew.employee_id;
        this.name = crew.name;
    }

    static createCrew(crew_name, crew_leader){
        // Insert crew statement
        return new Promise((resolve, reject) => {
            db.query("CALL sp_insert_crew(?,?,@crew_id)", [crew_name, crew_leader], (error, result) =>{
                return error ? reject(error): db.query("SELECT @crew_id;", (error, result)=>{
                    error ? reject(error) : resolve(result[0]["@crew_id"])
                })
            });
        });
    }

    static addEmployeesToCrews(crew_id, employees){
        return new Promise((resolve, reject) => {
            db.query("CALL sp_add_employees_to_crew(?,?)", [crew_id, employees], (error, result) =>{
                return error ? reject(error): resolve(result)
            });
        });
    }

    static getAllCrews(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM crews;", (error, result)=>{
                return error ? reject(error): resolve(result)
            });
        })
    }

    static getCrewEmployeeById(crewId){
        return new Promise((resolve, reject)=>{
            db.query("CALL sp_get_employees_by_crew_id(?);", crewId,(error, result)=>{
                return error ? reject(error): resolve(result[0])
            });
        })
    }


    static updateCrew(crew_id, crew_name, crew_leader){
        return new Promise((resolve, reject)=>{
            db.query("CALL sp_update_crew(?,?,?)", [crew_id, crew_name, crew_leader], (error, result)=>{
                error ? reject(error) : resolve(result);
            })
        })
    }

    static deleteCrewEmployee(crew_id, employee_id){
        return new Promise((resolve, reject)=>{
            db.query("CALL sp_delete_employee_from_crew(?,?)", [crew_id, employee_id], (error, result)=>{
                error ? reject(error) : resolve(result);
            })
        });
    } 

}

module.exports = Crew;


