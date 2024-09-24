var express = require("express");

var app = express();
const Sequelize = ("sequelize");
const sequelize = new ("", "fakeUser", "fakePassword", {
  dialect: "sqlite",
  storage: "data/fakeDB.sqlite",
});

app.post("/", function (req, res) {
  sequelize.query(
    "SELECT * FROM Products WHERE name LIKE " + req.body.username
  );
  res.write(req.body.xss)
});
