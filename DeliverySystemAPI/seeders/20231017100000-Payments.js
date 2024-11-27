"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Payments",
      [
        {
          stripeId: "3433",
          amount: 50.5,
          currency: "CAD",
          method: "visa",
        },
        {
          stripeId: "3434",
          amount: 500,
          currency: "CAD",
          method: "visa",
        },
        {
          stripeId: "3435",
          amount: 600,
          currency: "CAD",
          method: "visa",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
