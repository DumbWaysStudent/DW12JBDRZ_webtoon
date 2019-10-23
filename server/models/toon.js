"use strict";
module.exports = (sequelize, DataTypes) => {
  const Toon = sequelize.define(
    "toon",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image: DataTypes.STRING,
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Toon.associate = models => {
    Toon.belongsTo(models.genre, {
      as: "toonGenre",
      foreignKey: "genre"
    });
    Toon.belongsTo(models.user, {
      as: "createdBy",
      foreignKey: "created_by"
    });
    Toon.belongsToMany(models.user, {
      through: models.favorite,
      as: "favorites",
      foreignKey: "toon_id"
    });
  };
  return Toon;
};
