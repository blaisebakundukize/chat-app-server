import http from "http";
import socketio from "socket.io";
import userController from "./controllers/userController";
import chatController from "./controllers/chatController";
import { environment } from "./config/environment";
import socketEvent from "./helpers/socket";

// Get port from environment
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "Application/json");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );

  const url = new URL(environment.baseURL + req.url);

  if (url.pathname === "/api/users/register" && req.method === "POST") {
    userController.register(req, res);
  }

  if (url.pathname === "/api/users/login" && req.method === "POST") {
    userController.login(req, res);
  }

  if (url.pathname === "/api/users/me" && req.method === "GET") {
    console.log(url.pathname);
    userController.getAuthedUser(req, res);
  }

  if (url.pathname === "/api/recent-chats" && req.method === "GET") {
    chatController.getRecentConversation(req, res);
  }

  if (
    url.pathname.match(/\/api\/room\/\w+\/messages/) &&
    req.method === "GET"
  ) {
    const roomId = url.pathname.split("/")[3];
    chatController.getConversationByRoomId(req, res, roomId);
  }

  if (url.pathname === "/api/new-message" && req.method === "POST") {
    chatController.postMessage(req, res);
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Create socket connection
global.io = socketio.listen(server);
global.io.on("connection", socketEvent.connection);
