function loginGuard(req, res, next) {
  console.log("In guard");
  console.log(req.sessionID);
  console.log(req.session);
  if (req.session.userID) {
    next();
  } else {
    res.send({ loggedIn: false });
  }
}

module.exports = loginGuard;
