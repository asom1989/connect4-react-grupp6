import crypto from "crypto";


const SALT = "2cUMi+VRsGjxqank5yixHA==";

function getHash(userData: string) {
  const hash = crypto
    .pbkdf2Sync(userData, SALT, 1000, 64, "sha512")
    .toString("hex");
  return hash;
}