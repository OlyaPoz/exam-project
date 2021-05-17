const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} = require('./../../constants');

const tokenConfig = {
  access: {
    time: ACCESS_TOKEN_TIME,
    secret: ACCESS_TOKEN_SECRET,
  },
  refresh: {
    time: REFRESH_TOKEN_TIME,
    secret: REFRESH_TOKEN_SECRET,
  },
};

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const createToken = async (payload, { secret, time }) =>
  signJWT(payload, secret, { expiresIn: time });

const verifyToken = async (token, { secret }) => verifyJWT(token, secret);

module.exports.createTokenPair = async (payload = {}) => {
  return {
    refresh: await createToken(payload, tokenConfig.refresh),
    access: await createToken(payload, tokenConfig.access),
  };
};
module.exports.verifyAccessToken = token =>
  verifyToken(token, tokenConfig.access);
module.exports.verifyRefreshToken = token =>
  verifyToken(token, tokenConfig.refresh);
