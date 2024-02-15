import React from "react";
import { ChatEngine } from "react-chat-engine";
import "./chatroom.css"
function Chat() {
  const username = localStorage.getItem("username");
  const pass = localStorage.getItem("pass");

  return (
    <div className="bod">

    
    <ChatEngine
      projectID="d2e8088b-d7b0-4895-a0c1-2d209ff6e8c6"
      userName="Ashwin"
      userSecret="hero123"
    />
    </div>
  );
}

export default Chat;
