const bcrypt = require("bcryptjs");

module.exports = {
  dragonTreasure: async (req, res) => {
    const db = req.app.get("db");
    const getDragonTreasure = await db.get_dragon_treasure(1);
    return res.status(200).json(getDragonTreasure);
  },
  getUserTreasure: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req.session.user);

    const getUserTreasures = await db.get_user_treasure([req.session.user.id]);
    console.log(getUserTreasures);

    return res.status(200).json(getUserTreasures);
  },
  addUserTreasure: async (req, res) => {
    const { image_url } = req.body;
    const { id } = req.session.user;
    const db = req.app.get("db");
    const userTreasure = await db.add_user_treasure([image_url, id]);
    res.status(200).json(userTreasure);
  },
  getAllTreasure: async (req, res) => {
    const db = req.app.get("db");
    const getTreasures = db.get_all_treasure();
    res.status(200).json(getTreasures);
  }
};
