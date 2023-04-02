const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Address = require("../models/address");
const Client = require("../models/client");

// add client with list of address
const createClient = async (req, res) => {
  // Validate req.body params
  const client = req.body;
  if (!client || typeof client !== "object") {
    throw new CustomError.BadRequestError("Invalid client parameter");
  }

  // Validate client properties
  const requiredClientProperties = [
    "first_name",
    "last_name",
    "email",
    "cell_number",
    "life_stage",
  ];
  for (const prop of requiredClientProperties) {
    if (!client[prop]) {
      throw new Error(`Missing client property: ${prop}`);
    }
  }

  // Validate address array
  if (!Array.isArray(client.address)) {
    throw new Error("Invalid address parameter: expected an array");
  }

  // Validate address objects
  const requiredAddressProperties = [
    "street",
    "city",
    "state",
    "zip_code",
    "country",
  ];
  for (const address of client.address) {
    if (!address || typeof address !== "object") {
      throw new Error("Invalid address object");
    }
    for (const prop of requiredAddressProperties) {
      if (!address[prop]) {
        throw new Error(`Missing address property: ${prop}`);
      }
    }
  }

  // Convert client and address objects to instances of the Client and Address classes
  const convertedClient = new Client(client);
  const convertedAddress = client.address.map(
    (address) => new Address(address)
  );
  //send to db
  await Client.addClient(convertedClient, JSON.stringify(convertedAddress));
  // return response
  res.status(StatusCodes.CREATED).json({ msg: "Client inserted succesfully" });
};

// get all clients without address
const getAllClients = async (req, res) => {
  // call db function
  const clientList = await Client.getAllClients();

  res
    .status(StatusCodes.OK)
    .json({ listOfClients: clientList, length: clientList.length });
};

// get all client address by client id
const getAddressById = async (req, res) => {
  // Validate req.params
  const { id: clientId } = req.params;
  // validate that id is a valid number
  if (!clientId || isNaN(clientId)) {
    throw new CustomError.BadRequestError(`${clientId} is not valid`);
  }

  // The ID paramter is a valid number, convert
  const clientIdInt = parseInt(clientId);
  const clientAddresses = await Client.getClientAddressesById(clientIdInt);
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
const modifyClient = async (req, res) => {
  //Retrieve params
  const { id: clientId } = req.params;
  const client = req.body;

  if (!clientId || isNaN(clientId)) {
    throw new CustomError.BadRequestError(`${clientId} is not valid`);
  }
  if (!client || typeof client !== "object") {
    throw new Error("Invalid client parameter");
  }

  // Validate client properties
  const requiredClientProperties = [
    "first_name",
    "last_name",
    "email",
    "cell_number",
    "life_stage",
  ];
  for (const prop of requiredClientProperties) {
    if (!client[prop]) {
      throw new Error(`Missing client property: ${prop}`);
    }
  }

  // Convert client objects to instances of the Client and ensure that cliendId is INT
  const convertedClient = new Client(client);
  const clientIdInt = parseInt(clientId);
  // add client_id to client instances
  convertedClient["client_id"] = clientIdInt;
  // call db
  await Client.modifyClient(convertedClient);
  res.status(StatusCodes.ACCEPTED).json({ msg: convertedClient});
};

// TODO modify address
const modifyAddress = async (req, res) => {
  // Validate req.body params
  const address = req.body;
  const { id: addressId } = req.params;

  // validate that id is a valid number
  if (!addressId || isNaN(addressId)) {
    throw new CustomError.BadRequestError(`${addressId} is not valid`);
  }

  if (!address || typeof address !== "object") {
    throw new Error("Invalid address parameter");
  }

  // Validate address properties
  const requiredClientProperties = [
    "street",
    "city",
    "state",
    "zip_code",
    "country"
  ];

  for (const prop of requiredClientProperties) {
    if (!address[prop]) {
      throw new Error(`Missing address property: ${prop}`);
    }
  }

  // transform data
  const addressIdInt = parseInt(addressId);
  const convertedAddress = new Address(address);
  convertedAddress["address_id"] = addressIdInt;

  await Client.modifyAddress(convertedAddress);

  res.status(StatusCodes.ACCEPTED).json({ msg: `Address_id:${addressIdInt} was modified correctly` });
};
module.exports = {
  createClient,
  getAllClients,
  getAddressById,
  getSingleClientById,
  deleteAddress,
  modifyClient,
  modifyAddress,
};
