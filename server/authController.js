const bcrypt = require("bcryptjs");

module.exports = {
  //register
  register: async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get("db");
    const checkUser = await db.get_user(username);
    if (!checkUser === []) {
      res.status(409).json("Username Taken");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const result = await db.register_user([isAdmin, username, hash]);
      const user = result[0];
      req.session.user = {
        isAdmin: user.is_admin,
        id: user.id,
        username: user.username
      };
      res.status(201).json(req.session.user);
    }
  }

  //OR
  //   register: async (req, res) => {
  //     const { username, password, isAdmin } = req.body;
  //     const db = req.app.get('db');
  //     const result = await db.get_user([username]);
  //     const existingUser = result[0];
  //     if (existingUser) {
  //       return res.status(409).send('Username taken');
  //     }
  //     const salt = bcrypt.genSaltSync(10);
  //     const hash = bcrypt.hashSync(password, salt);
  //     const registeredUser = await db.register_user([isAdmin, username, hash]);
  //     const user = registeredUser[0];
  //     req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
  //     return res.status(201).send(req.session.user);
  //   },
};
