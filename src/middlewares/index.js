/* Green Work ERP by Victor Martinez */

import { authenticateUser, authorizePermissions } from './authentication.js';
import errorHandlerMiddleware from './error-handler.js';
import notFound from './not-found.js';
import {
  validateAddressParams,
  validateId,
  validateSingleAddress,
  validateCompanyParams,
} from './validate_params.js';

import {validateAuthParams, validateRegisterParams} from './validate_auth.js';

import { validateClientParams } from './validate_client.js';
import { middlewareUploadImage } from './image_handler.js';
import { validateVendorParams } from './validate_vendor.js';
import { validateServiceParams } from './validate_service.js';
import { validateMaterialParams } from './validate_material.js';
import { validateAppSettingParams } from './validate_app_setting.js';
import { validateServiceScheduleParams } from './validate_schedule_service.js';


export {
  validateRegisterParams,
  validateAuthParams,
  validateServiceScheduleParams,
  middlewareUploadImage,
  authenticateUser,
  authorizePermissions,
  errorHandlerMiddleware,
  notFound,
  validateAddressParams,
  validateId,
  validateClientParams,
  validateSingleAddress,
  validateCompanyParams,
  validateVendorParams,
  validateServiceParams,
  validateMaterialParams,
  validateAppSettingParams
};
