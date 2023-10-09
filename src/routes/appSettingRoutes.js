/* Green Work ERP by Victor Martinez */

const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateAppSettingParams,
  validateId,
} = require("../middlewares");

const {
    createAppSetting,
    getAppSettings,
    updateAppSetting
} = require("../controllers/appSettingController");

router
    .route("/")
    .get(authenticateUser, getAppSettings)
    .post(authenticateUser, validateAppSettingParams, createAppSetting)
    .put(authenticateUser, validateAppSettingParams, updateAppSetting);


module.exports = router;