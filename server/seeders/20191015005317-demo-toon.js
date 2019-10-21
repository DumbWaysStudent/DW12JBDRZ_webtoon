"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "toons",
      [
        {
          title: "The World Of Memory",
          genre: 3,
          image: "https://prodimage.images-bn.com/pimages/9781421571201_p0_v1_s600x595.jpg",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Magician's Genesis",
          genre: 3,
          image: "https://prodimage.images-bn.com/pimages/9781421571218_p0_v1_s550x406.jpg",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "The Return Bakura",
          genre: 3,
          image: "https://prodimage.images-bn.com/pimages/9781421571973_p0_v1_s550x406.jpg",
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
