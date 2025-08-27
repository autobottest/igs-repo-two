var express = require("express");

var app = express();
const Sequelize = ("sequelize");
const sequelize = new Sequelize("database", {
  dialect: "sqlite",
  storage: "data/fakeDB.sqlite",
});

app.post("/fakeLogin", function (req, res) {
  sequelize.query(
    "SELECT * Products WHERE name LIKE " + req.body.username
  );
  res.write(req.body.xss)
});
