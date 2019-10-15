const models = require("../models");

const Toon = models.toon;
const User = models.user;
const Genre = models.genre;
const Episode = models.episode;
const Page = models.page;
// const Favorite = models.favorite;

// Get all toons
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

// Get all favorite toons
const getFavToons = data => {
  const input = data.filter(item => {
    return item.isFavorite.length > 0;
  });
  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.isFavorite.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

// Get all toons by title
const getToonsByTitle = (data, title) => {
  const input = data.filter(item => {
    return item.title.toUpperCase().includes(title.toUpperCase());
  });
  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.isFavorite.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
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
    let newData;

    if (req.query.is_favorite == "true") newData = getFavToons(data);
    else if (req.query.title) newData = getToonsByTitle(data, req.query.title);
    else newData = getToons(data);
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
