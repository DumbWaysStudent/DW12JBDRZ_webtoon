"use strict";
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define(
    "episode",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image: DataTypes.STRING,
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
  Episode.associate = models => {
    Episode.belongsTo(models.toon, {
      as: "toonID",
      foreignKey: "toon_id"
    });
  };
  return Episode;
};
