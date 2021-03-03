import { pool } from "./pool";

class Db {
  constructor() {
    this.pool = pool;
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async query(queryText, params) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.pool.query(queryText, params);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Db();
