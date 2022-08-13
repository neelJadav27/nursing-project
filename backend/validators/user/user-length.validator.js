function userLengthValidator(username, password) {
  if (username.length > 12 || password.length > 12) {
    return false;
  }
  return true;
}

module.exports = userLengthValidator;
