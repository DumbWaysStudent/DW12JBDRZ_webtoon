//jshint esversion:6

require("dotenv").config();

const express = require("express");
require("express-group-routes");

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const authController = require("./controllers/auth");
const getController = require("./controllers/get");
const postController = require("./controllers/post");
const putController = require("./controllers/put");
const deleteController = require("./controllers/delete");

const { authenticated, authorized } = require("./middleware");

app.group("/api/v1", router => {
  router.post("/login", authController.login);
  router.post("/register", authController.register);

  // router.get("/webtoons", getController.showAllToons);
  router.get("/webtoon/:webtoon_id/episodes", getController.showToonEps);
  router.get(
    "/webtoon/:webtoon_id/episode/:episode_id",
    getController.showToonPages
  );

  router.get(
    "/user/:user_id/all_webtoons",
    authenticated,
    authorized,
    getController.showAllToons
  );
  router.get(
    "/user/:user_id/webtoons/favorites",
    authenticated,
    authorized,
    getController.showUserFavs
  );
  router.get(
    "/user/:user_id/webtoons",
    authenticated,
    authorized,
    getController.showCreatedToons
  );
  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episodes",
    authenticated,
    authorized,
    getController.showCreatedEps
  );
  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/images",
    authenticated,
    authorized,
    getController.showCreatedImgEps
  );

  router.post(
    "/user/:user_id/webtoon/:webtoon_id/favorite",
    authenticated,
    authorized,
    postController.storeUserFav
  );
  router.post(
    "/user/:user_id/webtoon",
    authenticated,
    authorized,
    postController.storeCreatedToon
  );
  router.post(
    "/user/:user_id/webtoon/:webtoon_id/episode",
    authenticated,
    authorized,
    postController.storeEpsToon
  );
  router.post(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image",
    authenticated,
    authorized,
    postController.storeImgEps
  );

  router.put(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    authorized,
    putController.updateMyToon
  );
  router.put(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id",
    authenticated,
    authorized,
    putController.updateMyEps
  );

  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/favorite",
    authenticated,
    authorized,
    deleteController.delUserFav
  );
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    authorized,
    deleteController.deleteMyToon
  );
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id",
    authenticated,
    authorized,
    deleteController.deleteMyEps
  );
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id",
    authenticated,
    authorized,
    deleteController.deleteImgEps
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
