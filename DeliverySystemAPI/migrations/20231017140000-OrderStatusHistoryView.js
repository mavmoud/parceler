module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
        CREATE VIEW order_status_history_v AS
        SELECT 
        osh."id",
        osh."orderId",
        osh."statusId",
        ts."statusName",
        osh."createdAt"
        FROM public."OrderStatusHistory" osh
        LEFT JOIN public."TrackingStatus" ts ON ts."id" = osh."statusId";
        `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "DROP VIEW IF EXISTS order_status_history_v;"
    );
  },
};
