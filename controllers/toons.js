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

// Set created toon
const setCreatedToon = (data, res) => {
  Genre.findOne({
    where: {
      id: data.genre
    },
    attributes: ["name"]
  }).then(genre => {
    const newData = {
      id: data.id,
      title: data.title,
      genre: genre.name,
      isFavorite: false,
      image: data.image,
      createdBy: data.created_by,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    res.send(newData);
  });
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

exports.showToonEps = (req, res) => {
  const id = req.params.id_webtoon;

  Episode.findAll({
    where: { toon_id: id },
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.showToonPages = (req, res) => {
  const toonId = req.params.id_webtoon;
  const epsId = req.params.id_episode;

  Page.findAll({
    include: [
      {
        model: Episode,
        as: "episodeId",
        where: { toon_id: toonId, id: epsId },
        attributes: {
          exclude: ["id", "title", "image", "toon_id", "createdAt", "updatedAt"]
        }
      }
    ],
    attributes: { exclude: ["id", "episode_id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.showCreatedToons = (req, res) => {
  const user_id = req.params.user_id;

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

exports.storeCreatedToon = (req, res) => {
  const user_id = req.params.user_id;

  Genre.findOne({
    where: {
      name: req.body.genre
    },
    attributes: ["id"]
  }).then(item => {
    Toon.create({
      title: req.body.title,
      genre: item.id,
      image: "https://www.forbes.com/sites/joanmacdonald.jpg",
      created_by: user_id
    }).then(data => {
      setCreatedToon(data, res);
    });
  });
};

exports.showEpsCreatedToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonId",
        where: { created_by: userId, id: toonId },
        attributes: {
          exclude: [
            "id",
            "title",
            "genre",
            "image",
            "created_by",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ],
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};
