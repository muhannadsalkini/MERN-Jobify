import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  // get the token from cookies
  const { token } = req.cookies;

  // check if token not exist
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  // authenticate the user
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
