const models = require("../models");

const User = models.user;
const Genre = models.genre;
const Toon = models.toon;
const Episode = models.episode;

// Get updated toon
getUpdatedToons = data => {
  const newData = {
    id: data.id,
    title: data.title,
    genre: data.toonGenre.name,
    isFavorite: data.favorites.length ? true : false,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
  return newData;
};

exports.updateMyToon = (req, res) => {
  const { user_id, webtoon_id } = req.params;

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
        where: { created_by: user_id, id: webtoon_id }
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
            as: "favorites"
          }
        ],
        attributes: { exclude: ["genre", "created_by"] },
        where: { created_by: user_id, id: webtoon_id }
      }).then(data => {
        res.send(getUpdatedToons(data));
      });
    });
  });
};

exports.updateMyEps = (req, res) => {
  const { user_id, webtoon_id, episode_id } = req.params;

  Toon.findAll({
    where: { created_by: user_id, id: webtoon_id }
  }).then(data => {
    if (data.length > 0 && req.body.webtoonId == webtoon_id) {
      Episode.update(
        {
          title: req.body.title,
          toon_id: req.body.webtoonId,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg"
        },
        {
          where: { toon_id: webtoon_id, id: episode_id }
        }
      ).then(() => {
        Episode.findOne({
          where: { toon_id: webtoon_id, id: episode_id }
        }).then(data => {
          res.send(data);
        });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};
