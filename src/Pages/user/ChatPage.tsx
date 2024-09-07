import { FC } from "react";
import Header from "../../Components/User/Header";
import ChatInterface from "../../Components/User/ChatInterface";
import ChatProvider from "../../Context/ChatProvider";

const ChatPage: FC = () => {
  return (
    <>
      <ChatProvider>
          <Header />
          <ChatInterface />
      </ChatProvider>
    </>
  );
};

export default ChatPage;
