var express = require("express");

var app = express();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "fakeUser", "fakePassword", {
  dialect: "sqlite",
  storage: "data/fakeDB.sqlite",
});

app.post("/fakeLogin", function (req, res) {
  sequelize.query(
    "SELECT * FROM Products WHERE name LIKE " + req.body.username
  );
  res.write(req.body.xss)
});
