const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  // const token = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

/** 
const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.signedCookies.token;
    // token = req.cookies.token;
  }

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const payload = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      name: payload.user.name,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  };

*/

/*

*/

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "You are not authorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
