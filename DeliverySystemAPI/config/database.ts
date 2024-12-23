// config/database.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

class Database {
    private static instance: Sequelize | null = null;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            const isProduction = process.env.NODE_ENV === "production";

            if (isProduction && process.env.DATABASE_URL) {
                Database.instance = new Sequelize(process.env.DATABASE_URL, {
                    dialect: "postgres",
                    dialectOptions: {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false
                        }
                    },
                    logging: false,
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    }
                });
            } else {
                Database.instance = new Sequelize("parceler_db", "postgres", "password", {
                    host: "localhost",
                    dialect: "postgres",
                    logging: false
                });
            }
        }

        return Database.instance;
    }

    public static async testConnection(): Promise<void> {
        const instance = Database.getInstance();
        try {
            await instance.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }
}

export default Database;