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

const { authenticated, authorized } = require("./middleware");

app.group("/api/v1", router => {
  // Public API
  // Login
  router.post("/login", AuthController.login);
  // Register
  router.post("/register", AuthController.register);
  // Get/Search all toons
  router.get("/webtoons", ToonsController.showAllToons);
  // Get all episodes of a toon
  router.get("/webtoon/:webtoon_id/episodes", ToonsController.showToonEps);
  // Get all pages of an episode
  router.get(
    "/webtoon/:webtoon_id/episode/:episode_id",
    ToonsController.showToonPages
  );

  // Private API

  /**
   * GET METHODS
   */

  // Get/Search all toons
  router.get(
    "/user/:user_id/all_webtoons",
    authenticated,
    authorized,
    ToonsController.showAllToons
  );
  // Get created toons
  router.get(
    "/user/:user_id/webtoons",
    authenticated,
    authorized,
    ToonsController.showCreatedToons
  );
  // Get all episodes of a toon
  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episodes",
    authenticated,
    authorized,
    ToonsController.showEpsToon
  );
  // Get all images of an episode (for pages)
  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/images",
    authenticated,
    authorized,
    ToonsController.showImgEps
  );

  /**
   * POST METHODS
   */

  // Post a created toon
  router.post(
    "/user/:user_id/webtoon",
    authenticated,
    authorized,
    ToonsController.storeCreatedToon
  );
  // Post an episode of a toon
  router.post(
    "/user/:user_id/webtoon/:webtoon_id/episode",
    authenticated,
    authorized,
    ToonsController.storeEpsToon
  );
  // Post an image of an episode (for pages)
  router.post(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image",
    authenticated,
    authorized,
    ToonsController.storeImgEps
  );

  /**
   * PUT METHODS
   */

  // Update my toon
  router.put(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    authorized,
    ToonsController.updateMyToon
  );
  // Update my episode
  router.put(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id",
    authenticated,
    authorized,
    ToonsController.updateMyEps
  );

  /**
   * DELETE METHODS
   */

  // Delete my toon
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    authorized,
    ToonsController.deleteMyToon
  );
  // Delete my episode
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id",
    authenticated,
    authorized,
    ToonsController.deleteMyEps
  );
  // Delete an image of an episode (for pages)
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id",
    authenticated,
    authorized,
    ToonsController.deleteImgEps
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
