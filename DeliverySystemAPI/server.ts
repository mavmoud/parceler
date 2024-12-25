import express, { Request, Response } from "express";
import routes from "./routes";
import { port } from "./config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "https://parceler.mahmmk.com",
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

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
