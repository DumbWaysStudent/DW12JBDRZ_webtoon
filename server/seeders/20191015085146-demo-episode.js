"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "episodes",
      [
        {
          title: "Duel 1: The Millennium Treasure",
          image:
            "https://xy-06-w.mangapark.net/b4/b8/5bb74f251ab2724be3068b4b/02_229644_728_1173.webp",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 2: A Sleepless Night",
          image:
            "https://xy-06-w.mangapark.net/c4/b8/5bb74f2b1ab2724be3068b4c/03_198476_728_1173.webp",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 3: Mystery of the Artifact!!",
          image:
            "https://xy-06-w.mangapark.net/d4/b8/5bb74f311ab2724be3068b4d/01_168346_728_1173.webp",
          toon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 10: In The Name Of The Gods",
          image:
            "https://xy-06-w.mangapark.net/65/b8/5bb74f741ab2724be3068b56/02_289998_728_1173.webp",
          toon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 11: The Supreme Blow!",
          image:
            "https://xy-06-w.mangapark.net/75/b8/5bb74f7c1ab2724be3068b57/01_235758_728_1173.webp",
          toon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 12: The Quest for the Name",
          image:
            "https://xy-06-w.mangapark.net/85/b8/5bb74f841ab2724be3068b58/01_289718_728_1173.webp",
          toon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 19: Thief King Bakura lives!",
          image:
            "https://xy-06-w.mangapark.net/ca/dd/5bb74fbab5d60f4e7c25ddac/02_171094_728_1166.webp",
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 20: Temple Ambush!!",
          image:
            "https://xy-06-w.mangapark.net/da/dd/5bb74fc2b5d60f4e7c25ddad/01_73302_728_1159.webp",
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Duel 21: Assault on the Palace!",
          image:
            "https://xy-06-w.mangapark.net/ea/dd/5bb74fc5b5d60f4e7c25ddae/01_237894_728_1130.webp",
          toon_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("episodes", null, {});
  }
};
