/* Green Work ERP by Victor Martinez */

const {StatusCodes} = require("http-status-codes");
const Address = require('../models/address');

const getSingleAddress = async (req, res) =>{
    const {id} = req.params;

    const address = await Address.getSingleAddress(id);
    res.status(StatusCodes.OK).json({address: address})
}

// TODO: update address function
const updateSingleAddress = async (req, res) => {
    const {id} = req.params;
    const {street, city, state, zip_code, country} = req.body

    await Address.updateSingleAddress({
        address_id: id,
        street,
        city,
        state,
        zip_code, 
        country
    });

    res.status(StatusCodes.OK).json({msg: "Updated address correctly"})
}

module.exports = {
    getSingleAddress,
    updateSingleAddress
}