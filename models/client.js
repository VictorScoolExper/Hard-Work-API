const { db } = require("../db/connect");
const Address = require("./address");

class Client extends Address {
    constructor(client){
        super(client.address);
        this.client_id = client.client_id;
        this.first_name = client.first_name;
        this.last_name = client.last_name;
        this.email = client.email;
        this.cell_number = client.cell_number;
        this.life_stage = client.life_stage
    }

    static addClient (client, clientAddress){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_insert_client(?,?,?,?,?,?)', [
                client.first_name,
                client.last_name,
                client.email,
                client.cell_number,
                client.life_stage,
                clientAddress
            ],(error, result)=>{
                error ? reject(error) : resolve(result);
            });
        })
    }

    static getAllClients(){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_get_all_clients()',(error, result)=>{
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

}

module.exports = Client;