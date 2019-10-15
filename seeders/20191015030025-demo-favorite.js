"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "favorites",
      [
        {
          user_id: 1,
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          toon_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("favorites", null, {});
  }
};
