/* Green Work ERP by Victor Martinez */

import validator from "validator";
import * as CustomError from "../../../errors/index.js";

const validateCompanyRole = (body) => {
  const params = body;
  const errors = {};

  if (!params.name || !validator.isAlpha(params.name)) {
    errors.name =
      "Name is required or name must only be with alphabetical values.";
  }

  if (!params.desription) {
    errors.description =
      "Description is required or name must only be with alphabetical values.";
  }

  if (Object.keys(errors).length > 0) {
    throw new CustomError.BadRequestError(JSON.stringify(errors));
  } else {
    return;
  }
};

export { validateCompanyRole };
