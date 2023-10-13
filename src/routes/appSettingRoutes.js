/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  validateAppSettingParams,
  validateId,
} from '../middlewares/index.js';

import {
    createAppSetting,
    getAppSettings,
    updateAppSetting
} from '../controllers/appSettingController.js';

router
    .route("/")
    .get(authenticateUser, getAppSettings)
    .post(authenticateUser, validateAppSettingParams, createAppSetting)
    .put(authenticateUser, validateAppSettingParams, updateAppSetting);


export default router;