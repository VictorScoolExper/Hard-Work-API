const { authenticateUser, authorizePermissions } = require("./authentication");
const errorHandlerMiddleware = require("./error-handler");
const notFound = require("./not-found");
const {
  validateAddressParams,
  validateId,
  validateSingleAddress,
  validateCompanyParams
} = require("./validate_params");
const {
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee
} = require("./validate_employee");
const {
  validateClientParams
} = require("./validate_client");
const {
  middlewareUploadImage
} = require("./image_handler");

  const {validateVendorParams} = require("./validate_vendor")

module.exports = {
  middlewareUploadImage,
  authenticateUser,
  authorizePermissions,
  errorHandlerMiddleware,
  notFound,
  validateAddressParams,
  validateId,
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee,
  validateClientParams,
  validateSingleAddress,
  validateCompanyParams,
  validateVendorParams
};
