"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
          isUnique: (value, next) => {
            const self = this;

            User.findOne({ where: { email: value }, attributes: ["id"] })
              .then(user => {
                // Reject if a different user wants to use the same email
                if (user && self.id !== user.id) {
                  return next("Email already in use!");
                }
                return next();
              })
              .catch(err => {
                return next(err);
              });
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      name: DataTypes.STRING,
      avatarURI: DataTypes.STRING
    },
    {}
  );
  User.associate = models => {
    User.belongsToMany(models.toon, {
      through: models.favorite,
      as: "toons",
      foreignKey: "user_id"
    });
  };
  return User;
};
