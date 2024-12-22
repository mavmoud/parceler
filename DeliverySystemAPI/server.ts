import express, { Request, Response } from "express";
import routes from "./routes";
import { port } from "./config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { getSequelizeInstance } from './config/database';

dotenv.config();

const app = express();

// Allow specific origins for CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://parceler.mahmoud.am",
    "https://parcelerdelivery.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Async server startup function
async function startServer() {
    try {
        const sequelize = await getSequelizeInstance();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();