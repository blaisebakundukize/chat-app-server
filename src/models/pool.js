import pg from "pg";
import dotenv from "dotenv";
import { environment } from "../config/environment";

dotenv.config();

const { Pool } = pg;

console.log(environment.dbURL);

export const pool = new Pool({
  connectionString: environment["dbURL"],
});
