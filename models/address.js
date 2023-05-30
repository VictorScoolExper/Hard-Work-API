const { db } = require("../db/connect");
// TODO: utilize class or delete constructor
class Address {
    constructor(address){
        this.address_id = address.address_id;
        this.street = address.street;
        this.city = address.city;
        this.state = address.state;
        this.zip_code = address.zip_code;
        this.country = address.country;
    }

    static getSingleAddress(addressId){
        return new Promise((resolve, reject) =>{
            db.query('CALL sp_get_single_address(?)', addressId, (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            })
        })
    }

    static updateSingleAddress(address){
        return new Promise((resolve, reject) =>{
            db.query('CALL sp_update_address(?,?,?,?,?,?)', [
                address.address_id,
                address.street.toLowerCase(),
                address.city.toLowerCase(),
                address.state.toLowerCase(),
                address.zip_code,
                address.country.toLowerCase()
            ], (error, result)=>{
                error ? reject(error) : resolve(result);
            })
        })
    }
}

module.exports = Address;