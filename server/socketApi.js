// ++++++++++++++++++ Socket IO ++++++++++++++++++ //

module.exports.setup = (server) => {
  var socket_io = require("socket.io");
  var io = socket_io(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  var socketApi = {};
  socketApi.io = io;
  io.on("connection", function (socket) {
    console.log(`User Connected: ${socket.id}`);
    //join room
    socket.on("join_room", (data) => {
      socket.join(data);
      //   socket.emit("join_message", {
      //     text: `Welcome to Room ${data}`,
      //   });
    });
    // socket.on("user", (data) => {
    //   socket.broadcast.emit("user-connected", data);
    // });
    //send msg
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", {
        userName: data.user,
        message: data.message,
      });
    });
  });
};
