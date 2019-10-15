//jshint esversion:6

"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      avatarURI: DataTypes.STRING
    },
    {}
  );
  User.associate = models => {};
  return User;
};
