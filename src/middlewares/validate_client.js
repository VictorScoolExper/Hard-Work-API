/* Green Work ERP by Victor Martinez */

const validator = require("validator");

const validateClientParams = async (req, res, next) => {
  const params = req.body;
  const errors = {};

  if (!params.name || !validator.isAlpha(params.name)) {
    errors.name = "Name is required or name must only be with a alphabetical";
  }
  if (!params.last_name || !validator.isAlpha(params.last_name)) {
    errors.last_name =
      "Last name is required or must only be a alphabetical values";
  }
  if (!params.email || !validator.isEmail(params.email)) {
    errors.email = "Email is required and must be a valid email address.";
  }
  if (
    !params.cell_number ||
    !validator.isMobilePhone(params.cell_number, "any")
  ) {
    errors.cell_number =
      "Cell number is required and must be a valid phone number.";
  }
  if (!validator.isAlpha(params.life_stage)) {
    errors.life_stage = "Life stage must be a alphabetical value";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
  validateClientParams,
};
