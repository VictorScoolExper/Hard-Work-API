const { authenticateUser, authorizePermissions } = require("./authentication");
const errorHandlerMiddleware = require("./error-handler");
const notFound = require("./not-found");
const {
  validateAddressParams,
  validateVendorParams,
  validateId,
} = require("./validate_params");

module.exports = {
  authenticateUser,
  authorizePermissions,
  errorHandlerMiddleware,
  notFound,
  validateAddressParams,
  validateVendorParams,
  validateId,
};
