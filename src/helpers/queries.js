export const createUserTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  username VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`;

export const createChatRoomTable = ` CREATE TABLE IF NOT EXISTS chat_rooms(
  id SERIAL PRIMARY KEY,
  owner INT REFERENCES users (id) NOT NULL,
  friend INT REFERENCES users (id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (owner, friend)
)`;

export const createMessageTable = `CREATE TABLE IF NOT EXISTS messages(
  id SERIAL PRIMARY KEY,
  message VARCHAR NOT NULL,
  room INT REFERENCES chat_rooms (id) NOT NULL,
  sender INT REFERENCES users (id) NOT NULL,
  receiver INT REFERENCES users (id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`;
