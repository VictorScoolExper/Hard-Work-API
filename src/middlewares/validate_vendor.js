/* Green Work ERP by Victor Martinez */

import validator from 'validator';
import Company from '../models/company.js';

const validateVendorParams = async (req, res, next) => {
  const {
    name,
    last_name,
    company_id,
    email,
    cell_number,
    street,
    city,
    state,
    zip_code,
    country,
    include_address,
  } = req.body;
  const errors = {};

  if (!name || !validator.isAlpha(name)) {
    errors.name =
      "Name is required or name must only be with alphabetical values.";
  }

  if (!last_name || !validator.isAlpha(last_name)) {
    errors.last_name = "Last name is required and must contain only letters.";
  }

  if(!email || !validator.isEmail(email)) {
    errors.email = "Email is required and must be a valid email address.";
  }

  if (
    !cell_number ||
    !validator.isMobilePhone(cell_number, "any")
  ) {
    errors.cell_number =
      "Cell number is required and must be a valid phone number.";
  }
  // Verify that they want to include address
  if(include_address === "true"){
    if (!street) {
      errors.street =
        "Street is required and must be alphanumeric";
    }
  
    if (!city || !validator.isAlpha(city)) {
      errors.city =
        "City is required and must contain only letters";
    }
  
    if (!state || !validator.isAlpha(state)) {
      errors.state =
        "State is required and must contain only letters";
    }
  
    if (!zip_code || !validator.isPostalCode(zip_code, "any")) {
      errors.zip_code =
        "Zip code is required and must be a valid postal code";
    }
  
    if (!country || !validator.isAlpha(country)) {
      errors.country =
        "Country is required and must contain only letters";
    }
  }

  // checks if company exists
  const companyExist = await Company.checkCompanyExistence(company_id);
  if(companyExist !== 1){
    errors.company = "Company does no exist";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }

};

export {
    validateVendorParams
}
