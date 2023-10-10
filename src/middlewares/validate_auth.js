/* Green Work ERP by Victor Martinez */

const validator = require("validator");

/**
 * Middleware to validate authentication parameters (email and password) in a request.
 * If validation fails, it sends a 400 Bad Request response with error details.
 * If validation passes, it calls the next middleware in the chain.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function to call.
 */
const validateAuthParams = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email || !validator.isEmail(email)) {
    errors.email = "Email is required or must be a valid email.";
  }

  if (!password || !isStrongPassword(password)) {
    errors.password = "Password is required or must be a valid.";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

/**
 * Middleware to validate registration parameters in a request.
 * If validation fails, it sends a 400 Bad Request response with error details.
 * If validation passes, it calls the next middleware in the chain.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function to call.
 */
const validateRegisterParams = (req, res, next) => {
  const { name, last_name, cell_number, birth_date, email, password } =
    req.body;
  const errors = {};

  if (!name || !validator.isAlpha(name)) {
    errors.name = "Name is required or must be string.";
  }

  if (!last_name || !validator.isAlpha(last_name)) {
    errors.last_name = "Last name is required or must be a string.";
  }

  if (!cell_number || !validator.isMobilePhone(cell_number, "any")) {
    errors.cell_number = "Cell number is required or must be a string.";
  }

  // TODO: add date validator
  if (!birth_date) {
    errors.birth_date = "Birth date is required or must be a valid";
  }

  if (!email || !validator.isEmail(email)) {
    errors.email = "Email is required or must be a valid email.";
  }

  if (!password || !isStrongPassword(password)) {
    errors.password = "Password is required or must be a valid.";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = { validateAuthParams, validateRegisterParams };
