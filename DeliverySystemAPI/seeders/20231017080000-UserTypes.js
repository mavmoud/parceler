"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          id: 1,
          typeName: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          typeName: "Driver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          typeName: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserTypes", null, {});
  },
};
