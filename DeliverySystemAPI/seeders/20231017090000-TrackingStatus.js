"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TrackingStatus",
      [
        {
          id: 1,
          statusName: "Shipment Created",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          statusName: "Package Picked Up",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          statusName: "Package In Transit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          statusName: "Out for Delivery",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          statusName: "Package Delivered",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          statusName: "Delivery Attempted",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          statusName: "Returned to Sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TrackingStatus", null, {});
  },
};
