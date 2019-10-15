//jshint esversion:6

require("dotenv").config();

const express = require("express");
require("express-group-routes");

const app = express();
const port = 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const AuthController = require("./controllers/auth");

app.group("/api/v1", router => {
  // Public API
  // Login
  router.post("/login", AuthController.login);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
