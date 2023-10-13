/* Green Work ERP by Victor Martinez */

import validator from 'validator';

const validateArrayAddressParams = async (req, res, next) => {
  const params = req.body;
  const errors = {};

  if (!params.address || !Array.isArray(params.address) || !params.address[0]) {
    errors.address =
      "Addresses must be an array or must have at least one object";
  } else if (params.address) {
    params.address.forEach((address, index) => {
      // TODO: add string validation
      if (!address.street) {
        errors[`address[${index}].street`] =
          "Street is required and must be alphanumeric";
      }

      if (!address.city || !validator.isAlpha(address.city)) {
        errors[`address[${index}].city`] =
          "City is required and must contain only letters";
      }

      if (!address.state || !validator.isAlpha(address.state)) {
        errors[`address[${index}].state`] =
          "State is required and must contain only letters";
      }

      if (
        !address.zip_code ||
        !validator.isPostalCode(address.zip_code, "any")
      ) {
        errors[`address[${index}].zip_code`] =
          "Zip code is required and must be a valid postal code";
      }

      if (!address.country || !validator.isAlpha(address.country)) {
        errors[`address[${index}].country`] =
          "Country is required and must contain only letters";
      }
    });
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

const validateAddressParams = async (req, res, next) => {
  const { address } = req.body;
  const errors = {};

  if (!address) {
    errors.address =
      "Addresses must be an array or must have at least one object";
  } else if (address) {
    if (!address.street) {
      errors[`address[${index}].street`] =
        "Street is required and must be alphanumeric";
    }

    if (!address.city || !validator.isAlpha(address.city)) {
      errors[`address[${index}].city`] =
        "City is required and must contain only letters";
    }

    if (!address.state || !validator.isAlpha(address.state)) {
      errors[`address[${index}].state`] =
        "State is required and must contain only letters";
    }

    if (!address.zip_code || !validator.isPostalCode(address.zip_code, "any")) {
      errors[`address[${index}].zip_code`] =
        "Zip code is required and must be a valid postal code";
    }

    if (!address.country || !validator.isAlpha(address.country)) {
      errors[`address[${index}].country`] =
        "Country is required and must contain only letters";
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

const validateSingleAddress = async(req, res, next) => {
  const { street, city, state, zip_code, country } = req.body;
  const errors = {};

  if (!street) {
    errors[`[${index}].street`] =
      "Street is required and must be alphanumeric";
  }

  if (!city || !validator.isAlpha(city)) {
    errors[`[${index}].city`] =
      "City is required and must contain only letters";
  }

  if (!state || !validator.isAlpha(state)) {
    errors[`[${index}].state`] =
      "State is required and must contain only letters";
  }

  if (!zip_code || !validator.isPostalCode(zip_code, "any")) {
    errors[`[${index}].zip_code`] =
      "Zip code is required and must be a valid postal code";
  }

  if (!country || !validator.isAlpha(country)) {
    errors[`[${index}].country`] =
      "Country is required and must contain only letters";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
}

const validateCompanyParams = async (req, res, next) => {
  const {name, service_type} = req.body;
  const errors = {};

  if(!name){
    errors[`[${index}].name`] =
      "Name is required and must contain only letters";
  }

  if(!service_type || !validator.isAlpha(service_type)){
    errors[`[${index}].service_type`] =
      "Service Type is required and must contain only letters";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }

}

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const convertedId = parseInt(id);
  const errors = {};

  if (!convertedId || !Number.isInteger(convertedId)) {
    errors.id = "The id you entered is not a valid type";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

export {
  validateAddressParams,
  validateId,
  validateSingleAddress,
  validateCompanyParams
};
