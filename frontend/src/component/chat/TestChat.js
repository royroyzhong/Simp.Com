import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8888");

function TestChat() {
  const handleOnClick = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  return (
    <div>
      123
      <input placeholder="123" />
      <button onClick={handleOnClick}>Send</button>
    </div>
  );
}

export default TestChat;
