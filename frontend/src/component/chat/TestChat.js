// import React from "react";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:8888");

// function TestChat() {
//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState([]);
//   const [room, setRoom] = useState("");
//   const [user, setUser] = useState("");
//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };
//   const handleOnClick = () => {
//     if (message !== "") {
//       socket.emit("send_message", { user, message, room });
//       let tempEle = {
//         user: user,
//         message: message,
//       };
//       setMessageReceived((oldArray) => [...oldArray, tempEle]);
//     }
//   };
//   const handleUser = () => {
//     socket.emit("user", { user });
//   };
//   useEffect(() => {
//     // socket.on("user-connected", (name) => {
//     //   //   userName = name.user;
//     // });

//     socket.on("receive_message", (data) => {
//       let tempEle = {
//         user: data.userName,
//         message: data.message,
//       };
//       setMessageReceived((oldArray) => [...oldArray, tempEle]);
//     });
//   }, [socket]);

//   return (
//     <div>
//       <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input
//         placeholder="User"
//         onChange={(event) => {
//           setUser(event.target.value);
//         }}
//       />
//       <button onClick={handleUser}> Enter Name</button>
//       <input
//         placeholder="msg"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button onClick={handleOnClick}>Send</button>
//       <h1> Message:</h1>
//       {messageReceived.map((i) => {
//         return (
//           <div>
//             <p>
//               {i.user}:{i.message}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default TestChat;
