const { verify } = require("jsonwebtoken");
const { promisify } = require("util");

const verifyJwt = promisify(verify);

const authenticate = async (req, res, next) => {
  //  extract token from headers
  const token = req.headers.authorization.split(" ")[1];
  // verify token
  const decodedPayload = await verifyJwt(token, process.env.JWT_SECRET);

  // attach the user to the request object
  req.user = {
    id: decodedPayload.id,
    role: decodedPayload.role,
  };
  next();
};

module.exports = authenticate;
