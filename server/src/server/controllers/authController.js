const createHttpError = require('http-errors');
const { User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await AuthService.createSession(user);
      return res.send({ data });
    }
    next(createHttpError(400, 'Unable to create user with provided data'));
  } catch (error) {
    next(error);
  }
};

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await user.comparePassword(password))) {
      const data = await AuthService.createSession(user);
      return res.send({ data });
    }
    next(createHttpError(401, 'Invalid credentials'));
  } catch (error) {
    next(error);
  }
};

module.exports.refreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req; // refresh not expired
    const refreshTokenInstance = await RefreshToken.findOne({
      where: { value: refreshToken },
    });
    const data = await AuthService.refreshSession(refreshTokenInstance);
    return res.send({ data });
  } catch (error) {
    next(error);
  }
};
