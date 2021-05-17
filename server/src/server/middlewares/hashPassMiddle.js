const CONSTANTS = require('../../constants');
const ServerError = require('../errors/ServerError');
const bcryptjs = require('bcryptjs');

module.exports = async (req, res, next) => {
  try {
    req.hashPass = await bcryptjs.hash(req.body.password, CONSTANTS.SALT_ROUNDS);
    next();
  } catch (err) {
    next(new ServerError('Server Error on hash password'));
  }
};
