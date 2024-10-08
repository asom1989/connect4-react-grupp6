import crypto from "crypto";
import fs from "fs";
import { Request, Response } from "express";


const SALT = "2cUMi+VRsGjxqank5yixHA==";
const CREDENTIALS_REGEX = /\w{1,20}/;
const FILE_EXT_REGEX = /^data:image\/(png|jpg|jpeg|gif);base64,(.+)$/;
const USER_FOLDER = "./images/";
const IMAGE_FOLDER = "/user-data/";

function getHash(userData: string) {
  const hash = crypto
    .pbkdf2Sync(userData, SALT, 1000, 64, "sha512")
    .toString("hex");
  return hash;
}


const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!CREDENTIALS_REGEX.test(username) || !CREDENTIALS_REGEX.test(password)) {
    res.status(400).json({ error: "Invalid username or password format" })
  };

  const userFolder = USER_FOLDER + getHash(username + password);

  if (fs.existsSync(userFolder)) {
    const userData = JSON.parse(fs.readFileSync(userFolder + "/userData.json", "utf-8"));
    res.status(200).json(userData)
  } else {
    res.status(404).json({ error: "No such user." });
  }
};

const register = async (req: Request, res: Response) => {
  const { username, password, encoded }: { username: string; password: string; encoded: string } = req.body;
  if (!CREDENTIALS_REGEX.test(username) || !CREDENTIALS_REGEX.test(password)) {
    res.status(400).json({ error: "Invalid username or password format" });
  }
  if (!fs.existsSync(USER_FOLDER)) {
    fs.mkdirSync(USER_FOLDER);
  }
  const credentialsHash = getHash(username + password);
  const userFolder = USER_FOLDER + credentialsHash;
  if (fs.existsSync(userFolder)) { res.status(400).json({ error: "User already exists!" })}
  
  fs.mkdirSync(userFolder);
  let userProfileImage = null;

  const imageData = encoded.match(FILE_EXT_REGEX);
  if (imageData) {
    const binaryBuffer = Buffer.from(imageData[2], "base64");
    userProfileImage = `/userProfileImage.${imageData[1]}`;
    fs.writeFileSync(userFolder + userProfileImage, binaryBuffer);
    userProfileImage = IMAGE_FOLDER + credentialsHash + userProfileImage;
  }

  fs.writeFileSync(userFolder + "/userData.json", JSON.stringify({ username, userProfileImage }, null, " "), "utf-8");
  res.status(201).json({ username, userProfileImage });
};
export default { login, register };