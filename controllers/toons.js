const models = require("../models");

const Toon = models.toon;
const User = models.user;
const Genre = models.genre;
const Episode = models.episode;
const Page = models.page;
// const Favorite = models.favorite;

// Get all webtoons
const getToons = data => {
  const newData = data.map(item => {
    let newItem = {
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.isFavorite.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

exports.getAllToons = (req, res) => {
  Toon.findAll({
    include: [
      {
        model: Genre,
        as: "toonGenre",
        attributes: ["name"]
      },
      {
        model: User,
        as: "createdBy",
        attributes: ["id"]
      },
      {
        model: User,
        as: "isFavorite"
        // attributes: ["id"]
        // through: {
        //   model: Favorite,
        //   where: { user_id: 1 } //Example Logged in user
        // }
      }
    ],
    attributes: { exclude: ["genre", "created_by"] }
  }).then(data => {
    const newData = getToons(data);

    res.send(newData);
  });
};

exports.getToonEps = (req, res) => {
  const id = req.params.id_webtoon;

  Episode.findAll({
    where: { toon_id: id },
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.getToonPages = (req, res) => {
  const toonsId = req.params.id_webtoon;
  const epsId = req.params.id_episode;

  Page.findAll({
    where: { episode_id: toonsId, toon_id: epsId },
    attributes: { exclude: ["id", "episode_id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};
