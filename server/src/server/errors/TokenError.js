const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError {
  constructor (err) {
    super(err.message || 'token error', 419);
  }
}

module.exports = TokenError;
