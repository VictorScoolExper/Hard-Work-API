const { authenticateUser, authorizePermissions } = require("./authentication");
const errorHandlerMiddleware = require("./error-handler");
const notFound = require("./not-found");
const {
  validateAddressParams,
  validateVendorParams,
  validateId,
} = require("./validate_params");
const {
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee
} = require("./validate_employee");
const {
  middlewareUploadImage
} = require("./image_handler");

module.exports = {
  middlewareUploadImage,
  authenticateUser,
  authorizePermissions,
  errorHandlerMiddleware,
  notFound,
  validateAddressParams,
  validateVendorParams,
  validateId,
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee
};
