"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "favorite",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      toon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Favorite.associate = models => {
    Favorite.belongsTo(models.toon, {
      as: "toons",
      foreignKey: "toon_id"
    });
  };
  return Favorite;
};
