import { FC } from "react";
import Header from "../../Components/User/Header";
import ChatInterface from "../../Components/User/ChatInterface";
import ChatProvider from "../../Context/ChatProvider";

const ChatPage: FC = () => {
  return (
    <>
      <div className="overflow-clip">
        <ChatProvider>
          <Header />
          <ChatInterface />
        </ChatProvider>
      </div>
    </>
  );
};

export default ChatPage;
