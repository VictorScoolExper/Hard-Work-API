const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Address = require("../models/address");
const Client = require("../models/client");

// add client with list of address
// TODO fix the address problem with address table, saves ""
const createClient = async (req, res) => {
  // Validate req.body params
  const client = req.body;
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
  const convertedAddress = client.address.map(address => new Address(address));
  //send to db
  await Client.addClient(convertedClient, JSON.stringify(convertedAddress))
  // return response
  res.status(StatusCodes.CREATED).json({ msg: "The client was created" });
};


// get all clients without address
const getAllClients = async (req, res) =>{
    // call db function
    const clientList = await Client.getAllClients();

    res.status(StatusCodes.OK).json({listOfClients: clientList, length: clientList.length})
}

// get all client address by id
const getAddressById = async (req, res) =>{
    // Validate req.params
    const {id: clientId} = req.params
    // validate that id is a valid number
    if(!clientId || isNaN(clientId)){
        throw new CustomError.BadRequestError(`${clientId} is not valid`)
    }

    // The ID paramter is a valid number, convert
    const clientIdInt = parseInt(clientId)
    const clientAddresses = await Client.getClientAddressesById(clientIdInt);
    res.status(StatusCodes.OK).json({listAddress: clientAddresses, length: clientAddresses.length})
}
// TODO get single client with id

// TODO modify client with id, note that we can change activity

module.exports = {
  createClient,
  getAllClients,
  getAddressById
};
