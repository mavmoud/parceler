import { Sequelize } from "sequelize";

class Database {
    private static instance: Sequelize;

    private constructor() {}

    static getInstance(): Sequelize {
        if (!Database.instance) {
            // Provide an error if DATABASE_URL is missing
            if (!process.env.DATABASE_URL) {
                throw new Error("DATABASE_URL environment variable is not set.");
            }

            Database.instance = new Sequelize(process.env.DATABASE_URL, {
                dialect: "postgres",
                logging: false,
                // If you need SSL config, you can also add e.g.:
                dialectOptions: {
                  ssl: {
                    require: true,
                    rejectUnauthorized: false
                  }
                }
            });
        }
        return Database.instance;
    }
}

export const sequelize = Database.getInstance();