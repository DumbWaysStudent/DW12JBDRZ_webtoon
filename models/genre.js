"use strict";
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "genre",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Genre.associate = models => {};
  return Genre;
};
