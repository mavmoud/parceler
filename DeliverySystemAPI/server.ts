import express, { Request, Response } from "express";
import routes from "./routes";
import { port } from "./config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import Database from './config/database';

dotenv.config();

const app = express();

// CORS configuration
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

async function startServer() {
    try {
        // Test database connection before starting server
        await Database.testConnection();

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();