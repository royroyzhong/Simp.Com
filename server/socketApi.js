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
    socket.on("send_message", (data) => {
      console.log(data);
    });
  });
};
