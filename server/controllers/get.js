const models = require("../models");

const User = models.user;
const Genre = models.genre;
const Toon = models.toon;
const Episode = models.episode;
const Page = models.page;
const Favorite = models.favorite;

// Get all toons
const getToons = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      genre: item.toonGenre.name,
      favorites: item.favorites,
      isFavorite: item.favorites.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

// Get all toons by title
const getToonsByTitle = (data, title) => {
  const search = data.filter(item => {
    return item.title.toUpperCase().includes(title.toUpperCase());
  });
  const newData = search.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      genre: item.toonGenre.name,
      favorites: item.favorites,
      isFavorite: item.favorites.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

exports.showAllToons = (req, res) => {
  //const {user_id} = req.params;

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
        as: "favorites",
        attributes: ["id"],
        through: {
          model: Favorite,
          // where: { user_id },
          attributes: ["toon_id"]
        }
      }
    ],
    order: [["id", "ASC"]],
    attributes: { exclude: ["genre", "created_by"] }
  }).then(data => {
    let newData;

    if (req.query.title) newData = getToonsByTitle(data, req.query.title);
    else newData = getToons(data);
    res.send(newData);
  });
};

const getUserFavs = data => {
  let newData = data.map(item => {
    let newItem = {
      id: item.toons.id,
      title: item.toons.title,
      genre: item.toons.toonGenre.name,
      image: item.toons.image,
      createdAt: item.toons.createdAt,
      updatedAt: item.toons.updatedAt
    };
    return newItem;
  });
  return newData;
};

exports.showUserFavs = (req, res) => {
  const { user_id } = req.params;

  Favorite.findAll({
    include: [
      {
        model: Toon,
        as: "toons",
        attributes: {
          exclude: ["genre", "created_by"]
        },
        include: [
          {
            model: Genre,
            as: "toonGenre",
            attributes: ["name"]
          }
        ]
      }
    ],
    where: { user_id },
    order: [["id", "ASC"]],
    attributes: []
  }).then(data => {
    res.send(getUserFavs(data));
  });
};

exports.showToonEps = (req, res) => {
  const { webtoon_id } = req.params;

  Episode.findAll({
    where: { toon_id: webtoon_id },
    order: [["id", "ASC"]]
  }).then(data => {
    res.send(data);
  });
};

exports.showToonPages = (req, res) => {
  const { webtoon_id, episode_id } = req.params;

  Page.findAll({
    include: [
      {
        model: Episode,
        as: "episodeId",
        where: { toon_id: webtoon_id, id: episode_id },
        attributes: []
      }
    ],
    order: [["id", "ASC"]],
    attributes: { exclude: ["episode_id"] }
  }).then(data => {
    res.send(data);
  });
};

const getCreatedToons = data => {
  const newData = data.map(item => {
    let newItem = {
      title: item.title,
      genre: item.toonGenre.name,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

// Get created toons
exports.showCreatedToons = (req, res) => {
  const { user_id } = req.params;

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
      }
    ],
    where: { created_by: user_id },
    order: [["id", "ASC"]],
    attributes: { exclude: ["genre", "created_by"] }
  }).then(data => {
    res.send(getCreatedToons(data));
  });
};

// Get created episodes
exports.showCreatedEps = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonId",
        where: { created_by: user_id, id: webtoon_id },
        attributes: []
      }
    ],
    order: [["id", "ASC"]],
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

// Get created pages
exports.showCreatedImgEps = (req, res) => {
  const { user_id, webtoon_id, episode_id } = req.params;

  Page.findAll({
    include: [
      {
        model: Episode,
        as: "episodeId",
        where: { toon_id: webtoon_id, id: episode_id },
        attributes: [],
        include: [
          {
            model: Toon,
            as: "toonId",
            where: { created_by: user_id, id: webtoon_id },
            attributes: []
          }
        ]
      }
    ],
    order: [["id", "ASC"]],
    attributes: ["image"]
  }).then(data => {
    res.send(data);
  });
};
