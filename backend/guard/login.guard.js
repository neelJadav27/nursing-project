function loginGuard(req, res, next) {
  console.log("called");
  if (req.session.userID) {
    next();
  } else {
    res.send({ loggedIn: false });
  }
}

module.exports = loginGuard;
