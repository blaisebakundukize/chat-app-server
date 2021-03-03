import chatModel from "../models/chat";
import { decodeToken, getRequestBody } from "../helpers";

export class ChatController {
  async getRecentConversation(req, res) {
    try {
      await decodeToken(req, res);
      const chats = await chatModel.findUserChats(req.currentUser.id);
      return res.end(JSON.stringify({ data: chats }));
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          message: "Could not find chats due to internal error",
        })
      );
    }
  }

  async getConversationByRoomId(req, res, roomId) {
    try {
      // const currentUser = await decodeToken(req, res);
      const conversation = await chatModel.findConversationByRoomId(roomId);
      return res.end(JSON.stringify({ data: conversation }));
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          message: "Could not find the room chats due to internal error",
        })
      );
    }
  }

  async postMessage(req, res) {
    try {
      await decodeToken(req, res);
      const body = await getRequestBody(req);
      // get posted message and validate it
      const chat = JSON.parse(body);
      const conversation = await chatModel.createMessage(chat);
      global.io.sockets.in(chat.room).emit("message", conversation);
      return res.end(JSON.stringify(conversation));
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          message: "Could not post message due to internal error",
        })
      );
    }
  }
}

const chatController = new ChatController();

export default chatController;
