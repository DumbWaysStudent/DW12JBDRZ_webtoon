"use strict";
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "page",
    {
      page: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image: DataTypes.STRING,
      episode_id: {
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
  Page.associate = models => {
    Page.belongsTo(models.episode, {
      as: "episodeID",
      foreignKey: "episode_id"
    });
  };
  return Page;
};
