import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { environment } from "../config/environment";
import userModel from "../models/user";

export const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const hashPassword = (password) => {
  const saltRounds = 10;
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

export function validatePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export const generateAccessToken = (userId, expiry = "7d") =>
  jsonwebtoken.sign(
    {
      userId: userId,
    },
    environment.secretKey,
    { expiresIn: expiry }
  );

export const decodeToken = async (req, res) => {
  if (req.headers["authorization"]) {
    const accessToken = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jsonwebtoken.verify(accessToken, environment.secretKey);
      const user = await userModel.findById(decoded.userId);
      req.currentUser = user;
    } catch (error) {
      // Custom Error Object is needed
      throw new Error("Token is Invalid or expired");
      // res.writeHead(401, "content-Type", "Application/json");
      // return res.end(JSON.stringify({ error: "Token is invalid or expired" }));
    }
  } else {
    res.writeHead(401, "content-Type", "Application/json");
    res.end(JSON.stringify({ error: "Token is invalid or expired" }));
  }
};
