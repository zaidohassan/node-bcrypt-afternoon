require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const { register } = require("./authController");
const { login, logout } = require("./loginController");
const {
  dragonTreasure,
  getUserTreasure,
  addUserTreasure,
  getAllTreasure
} = require("./treasureController");
const { usersOnly, adminsOnly } = require("./middleware/authMiddleware");
const port = 4000;

app.use(json());
const { SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
  console.log("Database is Connected");
});

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);
app.get("/api/treasure/dragon", dragonTreasure);
app.get("/api/treasure/user", usersOnly, getUserTreasure);
app.post("/api/treasure/user", usersOnly, addUserTreasure);
app.get("/api/treasure/all", usersOnly, adminsOnly, getAllTreasure);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
