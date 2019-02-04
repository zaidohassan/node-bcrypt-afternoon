const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.get_user([username, password]);
    console.log(foundUser);
    const user = foundUser[0];
    if (!user) {
      res
        .status(401)
        .json(
          "User not found. Please register as a new user before logging in"
        );
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      res.status(403).json("Incorrect password");
    }
    req.session.user = {
      isAdmin: user.is_admin,
      username: user.username,
      id: user.id
    };
    res.status(200).json(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  }
};

// login: async (req, res) => {
//     const { username, password } = req.body;
//     const foundUser = await req.app.get('db').get_user([username]);
//     const user = foundUser[0];
//     if (!user) {
//       return res.status(401).send('User  not found. Please register as a new user before logging in.');
//     }
//     const isAuthenticated = bcrypt.compareSync(password, user.hash);
//     if (!isAuthenticated) {
//       return res.status(403).send('Incorrect password');
//     }
//     req.session.user = { isAdmin: user.is_admin, id: user.id, username: user.username };
//     return res.send(req.session.user);
//   },
