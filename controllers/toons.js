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

// Get updated toon
getUpdatedToons = data => {
  const newData = {
    id: data.id,
    title: data.title,
    genre: data.toonGenre.name,
    isFavorite: data.isFavorite.length ? true : false,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
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
        attributes: []
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

exports.showEpsToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonId",
        where: { created_by: userId, id: toonId },
        attributes: []
      }
    ],
    attributes: { exclude: ["id", "toon_id"] }
  }).then(data => {
    res.send(data);
  });
};

exports.updateMyToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;

  Genre.findOne({
    where: {
      name: req.body.genre
    },
    attributes: ["id"]
  }).then(item => {
    Toon.update(
      {
        title: req.body.title,
        genre: item.id,
        image: "https://www.forbes.com/sites/joanmacdonald.jpg"
      },
      {
        where: { created_by: userId, id: toonId }
      }
    ).then(() => {
      Toon.findOne({
        include: [
          {
            model: Genre,
            as: "toonGenre",
            attributes: ["name"]
          },
          {
            model: User,
            as: "isFavorite"
          }
        ],
        attributes: { exclude: ["genre", "created_by"] },
        where: { created_by: userId, id: toonId }
      }).then(data => {
        res.send(getUpdatedToons(data));
      });
    });
  });
};

exports.deleteMyToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;

  Toon.destroy({
    where: { created_by: userId, id: toonId }
  }).then(deletedRow => {
    res.status(200).json({ id: deletedRow });
  });
};

exports.storeEpsToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;

  Toon.findAll({
    where: { created_by: userId, id: toonId }
  }).then(items => {
    if (items.length > 0 && req.body.webtoonId == toonId) {
      Episode.create({
        toon_id: req.body.webtoonId,
        title: req.body.title,
        image: "https://www.forbes.com/sites/joanmacdonald.jpg"
      }).then(data => {
        res.send(data);
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.showImgEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;
  const epsId = req.params.episode_id;

  Page.findAll({
    include: [
      {
        model: Episode,
        as: "episodeId",
        where: { toon_id: toonId, id: epsId },
        attributes: [],
        include: [
          {
            model: Toon,
            as: "toonId",
            where: { created_by: userId, id: toonId },
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

exports.updateMyEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;
  const epsId = req.params.episode_id;

  Toon.findAll({
    where: { created_by: userId, id: toonId }
  }).then(data => {
    if (data.length > 0 && req.body.webtoonId == toonId) {
      Episode.update(
        {
          title: req.body.title,
          toon_id: req.body.webtoonId,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg"
        },
        {
          where: { toon_id: toonId, id: epsId }
        }
      ).then(() => {
        Episode.findOne({
          where: { toon_id: toonId, id: epsId }
        }).then(data => {
          res.send(data);
        });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.deleteMyEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;
  const epsId = req.params.episode_id;

  Toon.findAll({
    where: { created_by: userId, id: toonId }
  }).then(data => {
    if (data.length > 0) {
      Episode.destroy({
        where: { toon_id: toonId, id: epsId }
      }).then(deletedRow => {
        if (deletedRow > 0) {
          res.status(200).json({ id: deletedRow });
        } else {
          res.status(404).json({ message: "nothing to delete" });
        }
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.storeImgEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.webtoon_id;
  const epsId = req.params.episode_id;

  Episode.findAll({
    include: [
      {
        model: Toon,
        as: "toonId",
        where: { created_by: userId, id: toonId },
        attributes: []
      }
    ],
    where: { toon_id: toonId, id: epsId }
  }).then(items => {
    if (items.length > 0 && req.body.episodeId == epsId) {
      Page.create({
        episode_id: req.body.episodeId,
        page: req.body.page,
        image: "https://www.forbes.com/sites/joanmacdonald.jpg"
      }).then(data => {
        res.send(data);
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};
