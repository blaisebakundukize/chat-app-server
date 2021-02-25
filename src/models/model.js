import { pool } from "./pool";

class Model {
  constructor() {
    this.pool = pool;
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }
}

export default Model;
