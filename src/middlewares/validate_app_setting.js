/* Green Work ERP by Victor Martinez */

const validateAppSettingParams = (req, res, next) => {
  const { setting_name, setting_value, type_value } = req.body;
  const errors = {};

  if (!setting_name || typeof setting_name !== "string") {
    errors.setting_name = "Setting name is an incorrect value.";
  }
  if (!setting_value || typeof setting_value !== "string") {
    errors.setting_value = "Settings value is an incorrect value.";
  }
  if (!type_value || typeof type_value !== "string") {
    errors.type_value = "Type value is incorrect";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
    validateAppSettingParams
}
