const models = require("../models");

const Toon = models.toon;
const User = models.user;
const Genre = models.genre;
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
    let newData;
    if (req.query.is_favorite == "true") {
      newData = getFavToons(data);
    } else {
      newData = getToons(data);
    }
    res.send(newData);
  });
};
