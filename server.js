//jshint esversion:6

require("dotenv").config();

const express = require("express");
require("express-group-routes");

const app = express();
const port = 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const AuthController = require("./controllers/auth");
const ToonsController = require("./controllers/toons");

const { authenticated } = require("./middleware");

app.group("/api/v1", router => {
  // Public API
  // Login
  router.post("/login", AuthController.login);
  // Register
  router.post("/register", AuthController.register);
  // Get all episodes of a webtoon
  router.get("/webtoon/:id_webtoon/episodes", ToonsController.getToonEps);
  // Get all pages of an episode
  router.get(
    "/webtoon/:id_webtoon/episode/:id_episode",
    ToonsController.getToonPages
  );

  // Private API
  // Get all webtoons/favs
  router.get("/webtoons", authenticated, ToonsController.getAllToons);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
