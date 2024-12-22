import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

class Database {
    private static instance: Sequelize;

    private constructor() {}

    static getInstance(): Sequelize {
        if (!Database.instance) {
            const isProduction = process.env.NODE_ENV === "production";

            if (isProduction) {
                Database.instance = new Sequelize(process.env.DATABASE_URL || "", {
                    dialect: "postgres",
                    dialectOptions: {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false
                        }
                    },
                    logging: false
                });
            } else {
                Database.instance = new Sequelize("parceler_db", "postgres", "password", {
                    host: "localhost",
                    dialect: "postgres",
                    logging: false,
                });
            }
        }
        return Database.instance;
    }
}

export const sequelize = Database.getInstance();