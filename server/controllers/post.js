const models = require("../models");

const User = models.user;
const Genre = models.genre;
const Toon = models.toon;
const Episode = models.episode;
const Page = models.page;
const Favorite = models.favorite;

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

exports.storeUserFav = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  User.findOne({
    where: {
      id: user_id
    },
    attributes: ["id"]
  }).then(user => {
    if (user) {
      Toon.findOne({
        where: {
          id: webtoon_id
        },
        attributes: ["id"]
      }).then(toon => {
        if (toon) {
          Favorite.findOne({
            where: {
              user_id: user.id,
              toon_id: toon.id
            }
          }).then(data => {
            if (data) {
              res.status(400).json({ message: "Bad Request" });
            } else {
              Favorite.create({
                user_id,
                toon_id: webtoon_id
              }).then(item => {
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
                  where: { user_id: item.user_id }
                }).then(data => {
                  res.send(getUserFavs(data));
                });
              });
            }
          });
        } else {
          res.status(400).json({ message: "Bad Request" });
        }
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
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

exports.storeCreatedToon = (req, res) => {
  const { user_id } = req.params;

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

exports.storeEpsToon = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  Toon.findOne({
    where: { created_by: user_id, id: webtoon_id }
  }).then(items => {
    if (items && req.body.webtoonId == webtoon_id) {
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

exports.storeImgEps = (req, res) => {
  const { user_id, webtoon_id, episode_id } = req.params;

  Episode.findOne({
    include: [
      {
        model: Toon,
        as: "toonId",
        where: { created_by: user_id, id: webtoon_id },
        attributes: []
      }
    ],
    where: { toon_id: webtoon_id, id: episode_id }
  }).then(item => {
    if (item && req.body.episodeId == episode_id) {
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
