// import { Sequelize } from "sequelize";
//
// class Database {
//   private static instance: Sequelize;
//
//   private constructor() {}
//
//   static getInstance(): Sequelize {
//     if (!Database.instance) {
//       Database.instance = new Sequelize("parceler_db", "postgres", "password", {
//         host: "localhost",
//         dialect: "postgres",
//         logging: false,
//       });
//     }
//     return Database.instance;
//   }
// }
//
// export const sequelize = Database.getInstance();
import { Sequelize } from "sequelize";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
          process.env.PGDATABASE as string,
          process.env.PGUSER as string,
          process.env.PGPASSWORD as string,
          {
            host: process.env.PGHOST,
            port: Number(process.env.PGPORT),
            dialect: "postgres",
            logging: false,
          }
      );
    }
    return Database.instance;
  }
}

export const sequelize = Database.getInstance();