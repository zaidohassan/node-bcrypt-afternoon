module.exports = {
  usersOnly: (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send("Please log in");
    }
    next();
  },
  adminsOnly: (req, res, next) => {
    if (!req.session.user.isAdmin) {
      res.status(403).json("You are not an admin");
    }
    next();
  }
};
