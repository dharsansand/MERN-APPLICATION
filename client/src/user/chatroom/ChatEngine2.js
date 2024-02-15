import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatEngine2 = () => {
  const username = localStorage.getItem("username");
  const secret = localStorage.getItem("pass");
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        username={username} // adam
        secret={secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatEngine2;
