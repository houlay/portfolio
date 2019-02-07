// Dependencies
var express = require("express");
var path = require("path");
require("dotenv").config();

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Handle 404
app.use(function(req, res, next) {
  res.status(404).send("OOPS, what you were looking for doesn't exist here :)");
});

// Starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;
