import express, { Request, Response } from "express";
import routes from "./routes";
import { port } from "./config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Allow specific origins for CORS
const allowedOrigins = [
    "http://localhost:5173", // Local development
    "https://parceler.mahmoud.am", // Deployed custom domain
    "https://parcelerdelivery.vercel.app", // Deployed Vercel domain
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
    console.log(`Server is running on http://localhost:${port}`);
});