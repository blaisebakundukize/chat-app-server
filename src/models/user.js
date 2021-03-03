import db from "./db";

class UserModel {
  create(user) {
    const createUserQuery =
      "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) returning id, name, username, created_at";

    const values = [user.name, user.username, user.password];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(createUserQuery, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByUsername(username) {
    const queryFindUser = "SELECT * FROM users WHERE username = $1 LIMIT 1";
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryFindUser, [username]);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id) {
    const queryFindUser =
      "SELECT id, name, username, created_at FROM users WHERE id = $1 LIMIT 1";
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryFindUser, [id]);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new UserModel();
