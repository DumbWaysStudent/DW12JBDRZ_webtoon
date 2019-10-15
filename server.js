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
  // Get all episodes of a toon
  router.get("/webtoon/:id_webtoon/episodes", ToonsController.showToonEps);
  // Get all pages of an episode
  router.get(
    "/webtoon/:id_webtoon/episode/:id_episode",
    ToonsController.showToonPages
  );

  // Private API
  // Get/Search toons
  router.get("/webtoons", authenticated, ToonsController.showAllToons);
  // Get created toons
  router.get(
    "/user/:user_id/webtoons",
    authenticated,
    ToonsController.showCreatedToons
  );
  // Post a created toon
  router.post(
    "/user/:user_id/webtoon",
    authenticated,
    ToonsController.storeCreatedToon
  );
  // Get all episodes of a toon
  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episodes",
    authenticated,
    ToonsController.showEpsToon
  );
  // Update my toon
  router.put(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    ToonsController.updateMyToon
  );
  // Delete my toon
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    ToonsController.deleteMyToon
  );
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
