// ++++++++++++++++++ Socket IO ++++++++++++++++++ //

module.exports.setup = (server) => {
  var socket_io = require("socket.io");
  var io = socket_io(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  var socketApi = {};
  socketApi.io = io;
  io.on("connection", function (socket) {
    //join room
    socket.on("join_room", (data) => {
      socket.join(data);
    });

    //send msg
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", {
        userName: data.user,
        message: data.message,
      });
    });
  });
};
