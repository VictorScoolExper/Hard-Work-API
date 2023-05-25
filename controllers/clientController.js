const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Address = require("../models/address");
const Client = require("../models/client");

// add client with list of address
const createClient = async (req, res) => {
  const client = req.body;
  
  await Client.addClient(client);
  
  res.status(StatusCodes.CREATED).json({ msg: req.body});
};

// get all clients without address
const getAllClients = async (req, res) => {
  // call db function
  const clientList = await Client.getAllClients();

  res
    .status(StatusCodes.OK)
    .json({ clients: clientList, list_length: clientList.length });
};

// get all client address by client id
const getClientAddressById = async (req, res) => {
  const { id: clientId } = req.params;
  
  const clientAddresses = await Client.getClientAddressesById(clientId);
  res
    .status(StatusCodes.OK)
    .json({ listAddress: clientAddresses, length: clientAddresses.length });
};

// get single client with id
const getSingleClientById = async (req, res) => {
  // Validate req.params
  const { id: clientId } = req.params;

  // validate that id is a valid number
  if (!clientId || isNaN(clientId)) {
    throw new CustomError.BadRequestError(`${clientId} is not valid`);
  }

  // The ID paramter is a valid number, convert
  const clientIdInt = parseInt(clientId);
  const clientInfo = await Client.getClientById(clientIdInt);
  res.status(StatusCodes.OK).json({ client: clientInfo });
};

// deletes single address
// Note : address are going to not be used as reference to facilitate this
const deleteAddress = async (req, res) => {
  // validate params
  const { id: clientId } = req.params;
  const { address_id } = req.body;
  // validate that id and address_id is a valid number
  if (!clientId || isNaN(clientId)) {
    throw new CustomError.BadRequestError(`${clientId} is not valid`);
  }
  if (!address_id || isNaN(address_id)) {
    throw new CustomError.BadRequestError(`${address_id} is not valid`);
  }
  // convert to Int for security
  const clientIdInt = parseInt(clientId);
  const addressIdInt = parseInt(address_id);
  // send to data to db
  await Client.deleteById(clientIdInt, addressIdInt);
  res.status(StatusCodes.ACCEPTED).json({ msg: "address delete successfully" });
};

// TODO modify client with id, note that we can change activity
const updateClient = async (req, res) => {
  //Retrieve params
  const { id: clientId } = req.params;
  const client = req.body;

  await Client.updateClient({...client, client_id: clientId});
  res.status(StatusCodes.OK).json({ msg: "Updated client corretly"});
};


module.exports = {
  createClient,
  getAllClients,
  getClientAddressById,
  getSingleClientById,
  deleteAddress,
  updateClient,
};
