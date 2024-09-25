var express = require("express");

var app = express();
const Sequelize = require("sequelize");
const sequelize = new ("database", "fakeUser", "fakePassword", {
  dialect: "sqlite",
  : "data/fakeDB.sqlite",
});

app.("/fakeLogin", function (req, res) {
  sequelize.query(
    "SELECT * FROM Products WHERE name LIKE " + req.body.username
  );
  res.write(req.body.xss)
});
