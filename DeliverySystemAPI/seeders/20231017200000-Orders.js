"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          packageId: 1,
          paymentId: 1,
          senderId: 1,
          driverId: 2,
          recipientFirstName: "Olivia",
          recipientLastName: "Taylor",
          recipientAddress:
            "1234 Rue Sainte-Catherine Ouest, Apt 101, Montreal, Quebec H3G 1P1",
          senderAddress:
            "1455 Blvd. De Maisonneuve Ouest, Montreal, Quebec H3G 1M8",
          trackingNumber: "G5K8F1L2M3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          packageId: 2,
          paymentId: 2,
          senderId: 1,
          driverId: 2,
          recipientFirstName: "Ella",
          recipientLastName: "Adams",
          recipientAddress:
            "5678 Boulevard Saint-Laurent, Suite 200, Montreal, Quebec H2T 1R9",
          senderAddress:
            "1455 Blvd. De Maisonneuve Ouest, Montreal, Quebec H3G 1M8",
          trackingNumber: "G5K8F1L2M4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          packageId: 3,
          paymentId: 3,
          senderId: 1,
          driverId: 2,
          recipientFirstName: "Amelia",
          recipientLastName: "Allen",
          recipientAddress:
            "876 Rue Sherbrooke Ouest, Montreal, Quebec H3A 2M9",
          senderAddress:
            "1455 Blvd. De Maisonneuve Ouest, Montreal, Quebec H3G 1M8",
          trackingNumber: "G5K8F1L2M5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
