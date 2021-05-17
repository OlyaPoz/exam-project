module.exports = (err, req, res, next) => {
  console.log('LOG ERROR =>', err);
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.status = 406;
  }
  if (err.message || err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send('Server Error');
  }
};
