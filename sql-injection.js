var express = require("express");

var app = express();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("databse", "fakeUser", "fakPassword", {
  dialect: "sqlite",
  storage: "data/fakeDB.sqlite",
});

app."/fakeLogin", function (req, res) {
  sequelize.query(
    "SELECT * FROM Products WHERE name LIKE " + req.body.usernae
  );
  res.write(req.body.xss)
});
