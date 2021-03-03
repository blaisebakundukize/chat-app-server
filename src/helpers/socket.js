// class Socket {
//   connection(client) {
//     // event fired when a socket is disconnected
//     // console.log("Client Connected", client);
//     client.on("disconnect", () => {
//       global.users = global.users.filter((user) => user.socketId !== client.id);
//     });

//     // add identity of user mapped to the socket
//     client.on("identity", (userId) => {
//       global.users.push({
//         socketId: client.id,
//         userId,
//       });
//     });

//     // subscribe person to chat rooms
//     client.on("subscribe", (rooms) => {
//       rooms.map((room) => {
//         client.join(room);
//       });
//     });
//   }
// }

export default new Socket();
