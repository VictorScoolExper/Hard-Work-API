/* Green Work ERP by Victor Martinez */

const { authenticateUser, authorizePermissions } = require("./authentication");
const errorHandlerMiddleware = require("./error-handler");
const notFound = require("./not-found");
const {
  validateAddressParams,
  validateId,
  validateSingleAddress,
  validateCompanyParams,
} = require("./validate_params");

const {
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee,
} = require("./validate_employee");

const { validateClientParams } = require("./validate_client");
const { middlewareUploadImage } = require("./image_handler");
const { validateVendorParams } = require("./validate_vendor");
const {validateServiceParams} = require("./validate_service");
const {validateMaterialParams} = require("./validate_material");
const {validateAppSettingParams} = require("./validate_app_setting")
const {validateServiceScheduleParams} = require("./validate_schedule_service");

module.exports = {
  validateServiceScheduleParams,
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
  validateVendorParams,
  validateServiceParams,
  validateMaterialParams,
  validateAppSettingParams
};
