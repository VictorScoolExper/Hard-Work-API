const {db} = require("../db/connect");
const Address = require("./address");

class Vendor extends Address {
    constructor(vendor){
        super(vendor.address);
        this.vendor_id = vendor.vendor_id;
        this.first_name = vendor.first_name;
        this.last_name = vendor.last_name;
        this.company_id = vendor.company_id;
        this.email = vendor.email;
        this.cell_number = vendor.cell_number;
    }

    static addVendor (vendor, addresses){
        return new Promise((resolve, reject)=>{
            db.query('CALL sp_insert_vendor(?,?,?,?,?,?)', [
                vendor.first_name,
                vendor.last_name,
                vendor.company_id,
                vendor.email,
                vendor.cell_number,
                addresses
            ],(error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }
}

module.exports = Vendor;