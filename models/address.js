class Address {
    constructor(address){
        this.address_id = address.address_id;
        this.street = address.street;
        this.city = address.city;
        this.state = address.state;
        this.zip_code = address.zip_code;
        this.country = address.country;
    }
}

module.exports = Address;