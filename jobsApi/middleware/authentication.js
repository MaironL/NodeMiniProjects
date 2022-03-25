const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const userAuthMiddleware = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalidad');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //*attach the user to the job routes
    //@ts-ignore
    req.user = { userId: payload.userId, name: payload.name };

    //another way
    // const user = User.findById(payload.id).select("-password")
    // req.user = user

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalidad');
  }
};

module.exports = userAuthMiddleware;
