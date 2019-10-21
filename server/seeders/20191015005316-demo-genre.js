"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "genres",
      [
        {
          name: "Drama",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Romance",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Fantasy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
		{
          name: "Adventure",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("genres", null, {});
  }
};
