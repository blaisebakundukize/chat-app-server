export const createUserTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  username VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  created_on TIMESTAMP NOT NULL
)`;
