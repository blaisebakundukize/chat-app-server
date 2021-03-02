import db from "./db";

class ChatModel {
  createRoom(room) {
    const createRoomQuery =
      "INSERT INTO chat_rooms (owner, friend) VALUES ($1, $2) returning *";

    const values = [room.owner, room.friend];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(createRoomQuery, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  createMessage(chat) {
    const createMessageQuery =
      "INSERT INTO messages (message, room, sender, receiver) VALUES ($1, $2, $3, $4) returning *";

    const values = [chat.message, chat.room, chat.sender, chat.receiver];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(createMessageQuery, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  findRoomById(roomId) {
    const findRoomQuery = "SELECT * FROM chat_rooms WHERE id = $1 LIMIT 1";
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(findRoomQuery, [roomId]);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  findUserChats(userId) {
    const findChatsQuery =
      "SELECT DISTINCT ON (u.id) u.id, u.name, u.username, r.id as room, m.message, m.created_at FROM users u INNER JOIN chat_rooms r ON r.friend = u.id INNER JOIN messages m ON m.room = r.id WHERE r.owner = $1 UNION SELECT DISTINCT ON (u.id) u.id, u.name, u.username, r.id as room, m.message, m.created_at FROM users u INNER JOIN chat_rooms r ON r.owner = u.id INNER JOIN messages m ON m.room = r.id WHERE r.friend = $1 ORDER BY created_at DESC";
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(findChatsQuery, [userId]);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  findConversationByRoomId(roomId) {
    const query = "SELECT * FROM messages WHERE room = $1 ORDER BY created_at";
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(query, [roomId]);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new ChatModel();
