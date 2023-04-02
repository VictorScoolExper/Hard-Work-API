const {db} = require("../db/connect");
const Address = require("./address");

class Vendor extends Address {
    constructor(vendor){
        super(vendor.address);
        this.vendor_id = vendor.vendor_id;
        this.first_name = vendor.first_name;
        this.last_name = vendor.last_name;
        this.company = vendor.company;
        this.email = vendor.email;
        this.cell_number = vendor.cell_number;
    }
}

module.exports = Vendor;