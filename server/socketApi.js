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
    // console.log(`User Connected: ${socket.id}`);
    //join room
    socket.on("join_room", (data) => {
      console.log("enter: " + data);
      socket.join(data);
    });

    //send msg
    socket.on("send_message", (data) => {
      console.log(socket);
      console.log("room number:" + data.room);
      console.log(socket);
      socket.to(data.room).emit("receive_message", {
        userName: data.user,
        message: data.message,
      });
    });
  });
};
