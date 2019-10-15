"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "toons",
      [
        {
          title: "True Beauty",
          genre: 1,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Age Matters",
          genre: 2,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "A Good Day to be a Dog",
          genre: 1,
          image: "https://www.forbes.com/sites/joanmacdonald.jpg",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("toons", null, {});
  }
};
