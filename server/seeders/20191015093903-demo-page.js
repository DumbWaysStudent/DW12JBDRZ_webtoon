"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "pages",
      [
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/b4/b8/5bb74f251ab2724be3068b4b/01_156816_728_1173.webp",
          episode_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/c4/b8/5bb74f2b1ab2724be3068b4c/01_238444_728_1173.webp",
          episode_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/d4/b8/5bb74f311ab2724be3068b4d/01_168346_728_1173.webp",
          episode_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/65/b8/5bb74f741ab2724be3068b56/01_228764_728_1166.webp",
          episode_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/75/b8/5bb74f7c1ab2724be3068b57/01_235758_728_1173.webp",
          episode_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/85/b8/5bb74f841ab2724be3068b58/01_289718_728_1173.webp",
          episode_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/ca/dd/5bb74fbab5d60f4e7c25ddac/01_303442_728_1182.webp",
          episode_id: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/da/dd/5bb74fc2b5d60f4e7c25ddad/01_73302_728_1159.webp",
          episode_id: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://xy-06-w.mangapark.net/ea/dd/5bb74fc5b5d60f4e7c25ddae/01_237894_728_1130.webp",
          episode_id: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pages", null, {});
  }
};
