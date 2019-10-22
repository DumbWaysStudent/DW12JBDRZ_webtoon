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

// Get all favorite toons
const getFavToons = data => {
  const input = data.filter(item => {
    return item.favorites.length > 0;
  });
  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.toonGenre.name,
      isFavorite: item.favorites.length ? true : false,
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
      isFavorite: item.favorites.length ? true : false,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

exports.showAllToons = (req, res) => {
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
          where: { user_id: req.params.user_id },
          attributes: ["toon_id"]
        }
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
    attributes: [],
    where: { user_id }
  }).then(data => {
    res.send(getUserFavs(data));
  });
};

// Get created toons
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
    attributes: { exclude: ["genre", "created_by"] },
    where: {
      created_by: user_id
    }
  }).then(data => {
    res.send(getCreatedToons(data));
  });
};

exports.showEpsToon = (req, res) => {
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
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.showImgEps = (req, res) => {
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
    attributes: ["image"]
  }).then(data => {
    res.send(data);
  });
};