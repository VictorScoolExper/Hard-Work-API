/* Green Work ERP by Victor Martinez */

const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

/**
 * Authenticates the user 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, lastName, userId, role } = isTokenValid({ token });
    req.user = { name: name, lastName: lastName, userId: userId, role: role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

/**
 * Checks if the user has the permissions
 * @param  {Object} roles 
 * @returns 
 */
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    //in the incoming list includes the role in the user it will have access
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to acces this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
