import dotenv from "dotenv";

dotenv.config();

const environment = {
  env: process.env.NODE_ENV || "development",
  dbURL: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY || "",
  baseURL: process.env.BASE_URL,
};

if (environment.env === "test") {
  environment.dbURL = process.env.TEST_DB_URI || "";
}

export { environment };
