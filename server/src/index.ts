import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 5001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distFolder = path.join(__dirname, "../../dist");

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log("Server listening on port: " + PORT));

app.use(express.static(distFolder));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distFolder, "index.html"));
});
