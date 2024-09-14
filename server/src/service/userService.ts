import crypto from "crypto";
import fs from "fs";
import { Request, Response } from "express";


const SALT = "2cUMi+VRsGjxqank5yixHA==";
const USERNAMEANDPASSWORDREGEX = /\w{1,20}/;
const FILE_EXT_REGEX = /^data:image\/(png|jpg|jpeg|gif);base64,(.+)$/;

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
  const { username, password, encoded }: { username: string; password: string; encoded: string } = req.body;
  if (!USERNAMEANDPASSWORDREGEX.test(username) || !USERNAMEANDPASSWORDREGEX.test(password)) {
    res.status(400).json({ error: "Invalid username or password" });
  }

  const userFolder = "./images/" + getHash(username + password);
  if (fs.existsSync(userFolder)) { res.status(400).json({ error: "User already exists!" })}
  
  fs.mkdirSync(userFolder);
  let userProfileImage = null;

  const imageData = encoded.match(FILE_EXT_REGEX);
  if (imageData) {
    const binaryBuffer = Buffer.from(imageData[2], "base64");
    userProfileImage = `/userProfileImage.${imageData[1]}`;
    fs.writeFileSync(userFolder + userProfileImage, binaryBuffer);
  }

  fs.writeFileSync(userFolder + "/userData.json", JSON.stringify({ username, userProfileImage }, null, " "), "utf-8");
  res.status(201).json({ message: "User registered!" });
};
export default { login, register };