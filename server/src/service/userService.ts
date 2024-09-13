import crypto from "crypto";
import fs from "fs";
import { Request, Response } from "express";


const SALT = "2cUMi+VRsGjxqank5yixHA==";
const USERNAMEANDPASSWORDREGEX = /\w{1,15}/;

function getHash(userData: string) {
  const hash = crypto
    .pbkdf2Sync(userData, SALT, 1000, 64, "sha512")
    .toString("hex");
  return hash;
}


const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!USERNAMEANDPASSWORDREGEX.test(username) || !USERNAMEANDPASSWORDREGEX.test(password)) {
    res.status(400).json({ error: "Invalid username or password" })
  };

  const userFolder = "./images/" + getHash(username + password);

  if (fs.existsSync(userFolder)) {
    const userData = JSON.parse(fs.readFileSync(userFolder + "/userData.json", "utf-8"));
    res.status(200).json({...userData, userFolder: userFolder.replace("./images", "/user-data")});
  } else {
    res.status(404).json({ error: "No such user." });
  }
};

const register = async (req: Request, res: Response) => {
  const {username, password, encoded}: { username: string; password: string; encoded: string } = req.body;
  if (!USERNAMEANDPASSWORDREGEX.test(username) || !USERNAMEANDPASSWORDREGEX.test(password)) {
    res.status(400).json({ error: "Invalid username or password" });
  }

  const binaryBuffer = Buffer.from(encoded.split("base64")[1], "base64");
  const userFolder = "./images/" + getHash(username + password);
  
  if (fs.existsSync(userFolder)) {
    res.status(400).json({ error: "User already exists!" });
  } else {
    fs.mkdirSync(userFolder);
    fs.writeFileSync(userFolder + "/userProfileImage.jpg", binaryBuffer);
    fs.writeFileSync(userFolder + "/userData.json", JSON.stringify({ username }, null, " "), "utf-8");
    res.status(201).json({ message: "User registered!" });
  }
};
export default { login, register };