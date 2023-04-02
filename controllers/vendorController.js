const { StatusCodes } = require("http-status-codes");
const validator = require("validator");
const CustomError = require("../errors");
const Address = require("../models/address");
const Vendor = require("../models/vendor");

// TODO: Add vendor and list of addresses.
const addVendor = async (req, res) => {
  // get params
  const params = req.body;
  const vendor = new Vendor(params);  
//   const addresses = params.address.map((address) => new Address(address));

  // if does not exist create company

  res.status(StatusCodes.CREATED).json({ msg: "hello"});
};

module.exports = {
  addVendor,
};
