"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Packages",
      [
        {
          weight: 20.5,
          dimension: "3x5x3",
          declaredValue: 55,
        },
        {
          weight: 500,
          dimension: "50x5x10",
          declaredValue: 55,
        },
        {
          weight: 200,
          dimension: "50x5x10",
          declaredValue: 55,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Packages", null, {});
  },
};
