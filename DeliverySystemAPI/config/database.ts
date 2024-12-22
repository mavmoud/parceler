// config/database.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

class Database {
    private static instance: Sequelize;
    private static retryCount = 0;
    private static maxRetries = 5;
    private static retryInterval = 5000; // 5 seconds

    private constructor() {}

    static async getInstance(): Promise<Sequelize> {
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
                    logging: false,
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    retry: {
                        max: 5,
                        match: [
                            /SequelizeConnectionError/,
                            /SequelizeConnectionRefusedError/,
                            /SequelizeHostNotFoundError/,
                            /SequelizeHostNotReachableError/,
                            /SequelizeInvalidConnectionError/,
                            /SequelizeConnectionTimedOutError/,
                            /TimeoutError/
                        ]
                    }
                });
            } else {
                Database.instance = new Sequelize("parceler_db", "postgres", "password", {
                    host: "localhost",
                    dialect: "postgres",
                    logging: false
                });
            }

            // Test the connection with retry logic
            while (Database.retryCount < Database.maxRetries) {
                try {
                    await Database.instance.authenticate();
                    console.log('Database connection established successfully.');
                    break;
                } catch (error) {
                    Database.retryCount++;
                    console.error(`Database connection attempt ${Database.retryCount} failed:`, error);

                    if (Database.retryCount === Database.maxRetries) {
                        throw new Error('Maximum database connection attempts reached');
                    }

                    await new Promise(resolve => setTimeout(resolve, Database.retryInterval));
                }
            }
        }

        return Database.instance;
    }
}

// Export as async function to properly handle connection
export const getSequelizeInstance = () => Database.getInstance();