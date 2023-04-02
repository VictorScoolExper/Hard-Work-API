const { StatusCodes } = require("http-status-codes");
const validator = require("validator");
const CustomError = require("../errors");
const Address = require("../models/address");
const Company = require("../models/company");
const Vendor = require("../models/vendor");

// TODO: Add vendor and list of addresses.
const addVendor = async (req, res) => {
  // get params
  const params = req.body;
  const vendor = new Vendor(params);  
  const addresses = params.address.map((address) => new Address(address));

  // checks if company exists
  const companyExist = await Company.checkCompanyExistence(vendor["company_id"]);
  if(companyExist !== 1){
    throw new CustomError.BadRequestError("Error when inserting company")
  }

  // send to db function
  await Vendor.addVendor(vendor, JSON.stringify(addresses));

  res.status(StatusCodes.CREATED).json({ msg: "The vendor has been inserted correctly"});
};

module.exports = {
  addVendor,
};
