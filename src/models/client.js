/* Green Work ERP by Victor Martinez */

const { db } = require("../utils/mysql");
const Address = require("./address");
// TODO: utilize class or delete constructor
class Client extends Address {
    constructor(client){
        super(client.address);
        this.client_id = client.client_id;
        this.name = client.name;
        this.last_name = client.last_name;
        this.email = client.email;
        this.cell_number = client.cell_number;
        this.life_stage = client.life_stage
    }

    static addClient (client){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_insert_client(?,?,?,?,?,?,?,?,?,?)', [
                client.name.toLowerCase(),
                client.last_name.toLowerCase(),
                client.email.toLowerCase(),
                client.cell_number,
                client.life_stage.toLowerCase(),
                client.address.street.toLowerCase(),
                client.address.city.toLowerCase(),
                client.address.state.toLowerCase(),
                client.address.zip_code,
                client.address.country.toLowerCase()
            ],(error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getAllClients(){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_get_clients()',(error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getClientAddressesById(clientId){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_get_client_addresses(?)',clientId,(error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static getClientById(clientId){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_get_client_info(?)',clientId,(error, result)=>{
                error ? reject(error) : resolve(result[0][0]);
            });
        })
    }
    // recieves Client Id and Address id
    static deleteById(clientId, addressId){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_delete_address(?,?)',[clientId,addressId],(error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static updateClient(client){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_update_client(?,?,?,?,?,?)', [
                client.client_id, 
                client.name.toLowerCase(),
                client.last_name.toLowerCase(),
                client.email.toLowerCase(),
                client.cell_number,
                client.life_stage.toLowerCase()
            ], (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

}

module.exports = Client;