const validator = require("validator");

const validateAddVendorParams = async (req, res, next) => {
  const params = req.body;
  const errors = {};

  if (!params.first_name || !validator.isAlpha(params.first_name)) {
    errors.first_name = 'First name is required and must contain only letters';
  }

  if (!params.last_name || !validator.isAlpha(params.last_name)) {
    errors.last_name = 'Last name is required and must contain only letters';
  }

  if (!params.company || !validator.isInt(params.company)) {
    errors.last_name = 'Company is required and must contain only numbers';
  }

  if (!params.email || !validator.isEmail(params.email)) {
    errors.email = 'Email is required and must be a valid email address';
  }

  if (!params.cell_number || !validator.isMobilePhone(params.cell_number, 'any')) {
    errors.cell_number = 'Cell number is required and must be a valid phone number';
  }

  if (!params.address || !Array.isArray(params.address) || !params.address[0]) {
    errors.address = 'Addresses must be an array or must have at least one object';
  } else if (params.address) {
    params.address.forEach((address, index) => {
      // TODO: add string validation
      if (!address.street) {
        errors[`address[${index}].street`] = 'Street is required and must be alphanumeric';
      }

      if (!address.city || !validator.isAlpha(address.city)) {
        errors[`address[${index}].city`] = 'City is required and must contain only letters';
      }

      if (!address.state || !validator.isAlpha(address.state)) {
        errors[`address[${index}].state`] = 'State is required and must contain only letters';
      }

      if (!address.zip_code || !validator.isPostalCode(address.zip_code, 'any')) {
        errors[`address[${index}].zip_code`] = 'Zip code is required and must be a valid postal code';
      }

      if (!address.country || !validator.isAlpha(address.country)) {
        errors[`address[${index}].country`] = 'Country is required and must contain only letters';
      }
    });
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
  validateAddVendorParams,
};
