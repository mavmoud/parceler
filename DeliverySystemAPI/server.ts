import express, { Request, Response } from "express";
import routes from "./routes";
import { port } from "./config";

const app = express();
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
