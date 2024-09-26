import { Sequelize } from "sequelize";

// Create a Sequelize instance
export const sequelize = new Sequelize("parceler_db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default sequelize;
