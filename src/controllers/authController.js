/* Green Work ERP by Victor Martinez */

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

/**
 * Handles user login by validating credentials, generating tokens and sending a response
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
*/
const login = async (req, res) => {
  // extract email and password from request body
  const { email, password } = req.body;

  // TODO: Middleware should handle this validation
  // Check if email or password is missing, and throw a BadRequestError if so
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  // Get user information from the database based on the provided email
  const user = await User.getUserInfo(email);

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // TODO: Middleware should handle this password comparison
  // Compare the provided password with the user's hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // Create a token for the user
  const tokenUser = createTokenUser(user);
  // Attach cookies to the response 
  attachCookiesToResponse({ res, user: tokenUser });

  // JSON response with 200 OK
  res.status(StatusCodes.OK).json(tokenUser);
};

/**
 * Handles user registry 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
// TODO: eliminate function
const register = async (req, res) => {
  const { name, last_name, cell_number, role, birth_date, email, password } =
    req.body;

  // Could be Moved to middleware
  // validates that the email does exist  
  const emailAlreadyExist = await User.findEmailAuth(email);
  if (emailAlreadyExist === 1) {
    throw new CustomError.BadRequestError("Email Already Exists");
  }


  // modify to be able to create employee accounts or client accounts logins
  isFirstAccount = await User.isUserEmpty();
  if (isFirstAccount === 0) {
    throw new CustomError.BadRequestError(
      "You are not allowed to create account"
    );
  }

  // Hash the password for the user that is registering
  const newPassword = await bcrypt.hash(password.toString(), 10);
  // create new user object 
  const newUser = {
    name: name.toLowerCase(),
    last_name: last_name.toLowerCase(),
    cell_number,
    role: role.toLowerCase(),
    birth_date,
    email,
    password: newPassword,
  };

  // 
  const user = await User.createUser(newUser);

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

/**
 * Handles user logout by clearing the authentication token cookie and sending a response.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
const logout = async (req, res) => {
  // Clear the authentication token cookie by setting it to "logout" and expiring it immediately
  res.cookie("token", "logout", {
    httpOnly: true, // Ensures the cookie is accessible only through HTTP (not JavaScript)
    expires: new Date(Date.now()), // Set the expiration date to the current time (expires immediately)
  });

  // Send a JSON response indicating successful user logout
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

// TODO: Delete function below
const checkPermission = (req, res) => {
  res.status(StatusCodes.OK).json({ valid: "true" });
};

module.exports = {
  login,
  register,
  logout,
  checkPermission,
};
