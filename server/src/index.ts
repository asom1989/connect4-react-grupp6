import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userService from "./service/userService.js";

const PORT = 5001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distFolder = path.join(__dirname, "../../dist");

const app = express();

const imageServer = express();
imageServer.use(express.static("images"));
app.use("/user-data", imageServer);

app.use(express.json({ limit: "10MB"}));

app.post("/api/login", userService.login);
app.post("/api/register", userService.register);

app.listen(PORT, () => console.log("Server listening on port: " + PORT));

app.use(express.static(distFolder));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distFolder, "index.html"));
});
