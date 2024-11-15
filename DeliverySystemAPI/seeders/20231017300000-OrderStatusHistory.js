"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderStatusHistory",
      [
        {
          id: 1,
          orderId: 1,
          statusId: 1,
        },
        {
          id: 2,
          orderId: 2,
          statusId: 1,
        },
        {
          id: 3,
          orderId: 3,
          statusId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderStatusHistory", null, {});
  },
};
