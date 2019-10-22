const models = require("../models");

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

exports.delUserFav = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  Favorite.destroy({
    where: { user_id, toon_id: webtoon_id }
  }).then(deletedRow => {
    if (deletedRow > 0) {
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
    } else {
      res.status(404).json({ message: "nothing to delete" });
    }
  });
};

exports.deleteMyToon = (req, res) => {
  const { user_id, webtoon_id } = req.params;

  Toon.destroy({
    where: { created_by: user_id, id: webtoon_id }
  }).then(deletedRow => {
    res.status(200).json({ id: deletedRow });
  });
};

exports.deleteMyEps = (req, res) => {
  const { user_id, webtoon_id, episode_id } = req.params;

  Toon.findAll({
    where: { created_by: user_id, id: webtoon_id }
  }).then(data => {
    if (data.length > 0) {
      Episode.destroy({
        where: { toon_id: webtoon_id, id: episode_id }
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

exports.deleteImgEps = (req, res) => {
  const { user_id, webtoon_id, episode_id, image_id } = req.params;

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
    ]
  }).then(items => {
    if (items.length > 0) {
      Page.destroy({
        where: { episode_id, id: image_id }
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
