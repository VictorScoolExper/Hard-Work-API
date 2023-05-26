const { StatusCodes } = require("http-status-codes");
const validator = require("validator");
const CustomError = require("../errors");
const Address = require("../models/address");
const Company = require("../models/company");
const Vendor = require("../models/vendor");

// Add vendor and list of addresses.
const createVendor = async (req, res) => {
  // get params
  const vendor = req.body;

  // // send to db function
  // await Vendor.insertVendor(vendor);

  res.status(StatusCodes.CREATED).json({ msg: "The vendor has been inserted correctly", status: 1});
};

// Get all vendor
const getVendors = async (req, res) =>{
  const listVendors = await Vendor.getAllVendors();
  res.status(StatusCodes.OK).json({vendors: listVendors, length: listVendors.length, status: 1})
}

// Get single vendor
const getSingleVendor = async (req, res) =>{
  const {id: vendorId} = req.body;
  const vendor = await Vendor.getSingleVendor(vendorId);
  res.status(StatusCodes.OK).json({vendor: vendor, status: 1})
};

// Get address/addresses of vendor by id
const getAddressVendor = async (req, res) =>{
  const {id: vendorId} = req.params;
  const addresses = await Vendor.getAddressVendor(vendorId);
  res.status(StatusCodes.OK).json({msg: addresses, status: 1});
};

// modify vendor
const modifyVendor = async (req, res) =>{
  const {id: vendorId} = req.params;
  const vendor = new Vendor(req.body);
  vendor["vendor_id"] = parseInt(vendorId);
  await Vendor.modifyVendor(vendor);

  res.status(StatusCodes.OK).json({msg: vendor, status: 1})
}

// modify address
// TODO: create throw error when the ids do not match anything.
const modifyAddressVendor = async (req, res) => {
  const { id: vendor_id } = req.params;
  const { address_id, address } = req.body;
  // validate params
  const addressId = parseInt(address_id);
  const vendorId = parseInt(vendor_id);
  if(!addressId){
    throw new CustomError.BadRequestError("The address id is invalid");
  }
  const addressToMod = new Address(address[0]);
  addressToMod["address_id"] = addressId;
  await Vendor.modifyAddressVendor(vendorId, addressToMod);
  // res.status(StatusCodes.OK).json({msg: "This address was modified correctly", status: 1});
  res.status(StatusCodes.OK).json({msg: addressToMod});
}

// delete address from vendor
const deleteVenderAddress = async (req, res) =>{
  const { id: vendor_id } = req.params;
  const { address_id } = req.body;
  // validate params
  const addressId = parseInt(address_id);
  const vendorId = parseInt(vendor_id);
  // if addressId cannot convert to Int it will be null
  if(!addressId){
    throw new CustomError.BadRequestError('Invalid ID');
  }

  await Vendor.deleteAddressVendor(vendorId, addressId);

  res.status(StatusCodes.OK).json({msg: "You have successfully deleted address", status: 1});
}

module.exports = {
  createVendor,
  getVendors,
  getSingleVendor,
  getAddressVendor,
  modifyVendor,
  deleteVenderAddress,
  modifyAddressVendor
};
