import { pool } from "../models/pool";
import { createUserTable } from "./queries";

export const executeQueries = async (queries) =>
  new Promise((resolve) => {
    queries.forEach(async (query, index) => {
      await pool.query(query);
      if (index + 1 === queries.length) resolve();
    });
  });

export const createTables = () => executeQueries([createUserTable]);
