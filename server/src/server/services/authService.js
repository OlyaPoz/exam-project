const JwtService = require('./jwtService');
const UserService = require('./userService');
const CONSTANTS = require('../../constants');

const getTokenPayload = user => ({
  userId: user.id,
  email: user.email,
  role: user.role,
});

module.exports.createSession = async user => {
  const tokenPair = await JwtService.createTokenPair(getTokenPayload(user));
  if ((await user.countRefreshTokens()) <= CONSTANTS.MAX_DEVICES_AMOUNT) {
    await user.createRefreshToken({ value: tokenPair.refresh });
  } else {
    const [oldRefreshToken] = await user.getRefreshTokens({
      order: [['updatedAt', 'ASC']],
    });
    await oldRefreshToken.update({
      value: tokenPair.refresh,
    });
  }
  return {
    user: UserService.prepareUser(user),
    tokenPair,
  };
};

module.exports.refreshSession = async refreshTokenInstance => {
  const user = await refreshTokenInstance.getUser();
  const tokenPair = await JwtService.createTokenPair(getTokenPayload(user));
  await refreshTokenInstance.update({
    value: tokenPair.refresh,
  });
  return {
    user: UserService.prepareUser(user),
    tokenPair,
  };
};
