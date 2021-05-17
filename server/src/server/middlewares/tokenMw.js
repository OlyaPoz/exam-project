const createHttpError = require('http-errors');
const JwtService = require('../services/jwtService');
const TokenError = require('../errors/TokenError');

const checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }, // 'Bearer slkfvhnrd.dfgrftnklh.srgfvujrfh'
    } = req;
    if (authorization) {
      const [, token] = authorization.split(' ');
      req.tokenData = await JwtService.verifyAccessToken(token);
      console.log(req.tokenData)
      return next();
    }
    next(createHttpError(401, 'Need token'));
  } catch (error) {
    next(new TokenError(error));
  }
};

const checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken }, // 'Bearer slkfvhnrd.dfgrftnklh.srgfvujrfh'
    } = req;
    console.log(refreshToken)
    req.tokenData = await JwtService.verifyRefreshToken(refreshToken);
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid refresh token'));
  }
};

module.exports.checkRefreshToken = checkRefreshToken;
module.exports.checkAccessToken = checkAccessToken;
