var express = require("express");
var router = express.Router();
var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });
};
